import {useTranslation} from 'react-i18next';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import Modalinfo from '../../../../components/Modalinfo/Modalinfo';
import Loading from '../../../../components/Loading/Loading';
import {IPlanOfCare} from './interface/IPlanOfCare';
import {getPlanOfCare} from './api/planOfCareAPI';
import dayjs from 'dayjs';
import {DATE_FORMAT} from '../../../../common/constants/constants';

const PlanOfCare = (props: any) => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);

  const [page, setPage] = useState(1);
  const [data, setData] = React.useState<IPlanOfCare[]>([]);
  const [loading, setLoading] = useState(true);
  const [noExtraData, setNoExtraData] = useState(false);

  const fetchData = async () => {
    try {
      const newData = await getPlanOfCare(user.token, user.id, 10, page);

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
            type={'PlanOfCare'}
            title={
              dayjs(new Date(item.created)).format(DATE_FORMAT) || t('no-data')
            }
            TopSubtitle={''}
            BottomSubtitle={`${t(
              'medicalHistory.planOfCare.therapeuticRecommendation.recommendation',
            )}: ${item.description || t('no-data')}`}>
            <ScrollView style={styles.containerHeight}>
              <Modalinfo
                placeholder={t(
                  'medicalHistory.planOfCare.therapeuticRecommendation.recommendation',
                )}
                value={item.description || t('no-data')}
              />
            </ScrollView>
          </InformationCard>
        )}
      />
      {loading && <Loading />}
    </View>
  );
};
export default PlanOfCare;

const styles = StyleSheet.create({
  containerHeight: {
    height: '100%',
  },
});
