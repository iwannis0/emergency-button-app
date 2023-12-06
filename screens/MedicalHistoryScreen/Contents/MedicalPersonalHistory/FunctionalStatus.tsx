import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getFunctionalStatus} from './api/medicalPersonalHistoryAPI';
import {IFunctionalStatus} from './interface/IFunctionalStatus';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import Loading from '../../../../components/Loading/Loading';
import dayjs from 'dayjs';
import {DATE_FORMAT} from '../../../../common/constants/constants';
import Modalinfo from '../../../../components/Modalinfo/Modalinfo';
import {useTranslation} from 'react-i18next';

const FunctionalStatus = () => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);

  const [page, setPage] = useState(1);
  const [data, setData] = React.useState<IFunctionalStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [noExtraData, setNoExtraData] = useState(false);

  const fetchData = async () => {
    try {
      const newData = await getFunctionalStatus(user.token, user.id, 10, page);

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
              item.value?.coding?.at(0)?.display || item.value?.text || '-'
            }
            TopSubtitle={`${t(
              'medicalHistory.medicalPersonalHistory.problems.functional.date',
            )}: ${
              dayjs(new Date(item.effectiveDateTime)).format(DATE_FORMAT) ||
              t('no-data')
            }`}
            BottomSubtitle={''}>
            <ScrollView>
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.problems.functional.date',
                )}
                value={
                  dayjs(new Date(item.effectiveDateTime)).format(DATE_FORMAT) ||
                  t('no-data')
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

export default FunctionalStatus;

const styles = StyleSheet.create({
  containerHeight: {
    height: '100%',
  },
});
