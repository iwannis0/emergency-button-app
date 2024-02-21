import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
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
import NoDataSection from '../../../../components/NoDataSection/NoDataSection';

const ResolvedProblems = () => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);
  const [data, setData] = React.useState<IResolvedProblems[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      return await getResolvedProblems(user.token, user.id, 'EN');
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

  return (
    <View style={styles.containerHeight}>
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        data={data}
        renderItem={({item}) => (
          <InformationCard
            type={'Procedure'}
            title={item.diagnosis || t('no-data')}
            TopSubtitle={`${t(
              'medicalHistory.medicalPersonalHistory.problems.current.onset',
            )}: ${dayjs(item.onsetDate).format(DATE_FORMAT) || t('no-data')}`}
            BottomSubtitle={`${t(
              'medicalHistory.medicalPersonalHistory.problems.resolved.resolution',
            )}: ${
              dayjs(item.resolutionDate).format(DATE_FORMAT) || t('no-data')
            }`}>
            <ScrollView>
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.problems.current.onset',
                )}
                value={
                  dayjs(item.onsetDate).format(DATE_FORMAT) || t('no-data')
                }
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.problems.resolved.resolution',
                )}
                value={
                  dayjs(item.resolutionDate).format(DATE_FORMAT) || t('no-data')
                }
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.problems.resolved.status',
                )}
                value={item.status || t('no-data')}
              />
            </ScrollView>
          </InformationCard>
        )}
        ListEmptyComponent={NoDataSection}
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
