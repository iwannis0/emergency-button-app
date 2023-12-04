import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import Modalinfo from '../../../../components/Modalinfo/Modalinfo';
import {getResolvedProblems} from './api/medicalPersonalHistoryAPI';
import {IResolvedProblems} from './interface/IResolvedProblems';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import Loading from '../../../../components/Loading/Loading';

import dayjs from 'dayjs';
import {DATE_FORMAT} from '../../../../common/constants/constants';

const ResolvedProblems = () => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);

  const [page, setPage] = useState(1);
  const [data, setData] = React.useState<IResolvedProblems[]>([]);
  const [loading, setLoading] = useState(true);
  const [noExtraData, setNoExtraData] = useState(false);

  const fetchData = async () => {
    try {
      const newData = await getResolvedProblems(user.token, user.id, 10, page);

      setPage(prevPage => prevPage + 1);
      if (newData.data.length === 0) {
        setNoExtraData(true);
      }
      return newData.data;
    } catch (error) {
      console.error(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData().then(newData => {
      setData(newData);
    });
  }, []);

  const handleEndReached = async () => {
    if (noExtraData) {
      return;
    }
    const newData = await fetchData();
    setData(prevData => [...prevData, ...newData]);
  };

  return (
    <View style={styles.containerHeight}>
      <FlatList
        onEndReachedThreshold={0.5}
        onEndReached={handleEndReached}
        keyExtractor={(_, index) => index.toString()}
        data={data}
        renderItem={({item}) => (
          <InformationCard
            type={'Procedure'}
            title={
              item.code?.icD10Code?.at(0)?.display ||
              item.code?.absentOrUnknownProblem?.at(0)?.display ||
              item.code?.otherCode?.at(0)?.display ||
              item.code?.coding?.at(0)?.display ||
              t('no-data')
            }
            TopSubtitle={`${t(
              'medicalHistory.medicalPersonalHistory.problems.current.severity',
            )}: ${item.severity?.coding?.at(0)?.display || t('no-data')}`}
            BottomSubtitle={`${t(
              'medicalHistory.medicalPersonalHistory.problems.resolved.resolution',
            )}: ${
              dayjs(new Date(item.abatement?.dateTime)).format(DATE_FORMAT) ||
              t('no-data')
            }`}>
            <ScrollView>
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.problems.current.severity',
                )}
                value={item.severity?.coding?.at(0)?.display || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.problems.current.onset',
                )}
                value={
                  dayjs(new Date(item.onset?.dateTime)).format(DATE_FORMAT) ||
                  t('no-data')
                }
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.problems.resolved.resolution',
                )}
                value={
                  dayjs(new Date(item.abatement?.dateTime)).format(
                    DATE_FORMAT,
                  ) || t('no-data')
                }
              />
            </ScrollView>
          </InformationCard>
        )}
      />
      {loading && <Loading />}
    </View>
  );
};

export default ResolvedProblems;

const styles = StyleSheet.create({
  containerHeight: {
    height: '100%',
  },
});
