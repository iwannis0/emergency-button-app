import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import {ITobaccoUse} from './interface/ITobaccoUse';
import {getTobaccoUse} from './api/socialHistoryAPI';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import Loading from '../../../../components/Loading/Loading';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import Modalinfo from '../../../../components/Modalinfo/Modalinfo';
import dayjs from 'dayjs';
import {DATE_FORMAT} from '../../../../common/constants/constants';

const TobbacoUse = (props: any) => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);

  const [page, setPage] = useState(1);
  const [data, setData] = React.useState<ITobaccoUse[]>([]);
  const [loading, setLoading] = useState(true);
  const [noExtraData, setNoExtraData] = useState(false);

  const fetchData = async () => {
    try {
      const newData = await getTobaccoUse(user.token, user.id, 10, page);

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
            type={'Social History'}
            title={item.tobaccoStatus?.display || t('no-data')}
            TopSubtitle={`${t(
              'medicalHistory.socialHistory.tobacco-use.tobacco-type',
            )}: ${item.tobaccoType?.display || t('no-data')}`}
            BottomSubtitle={`${t(
              'medicalHistory.socialHistory.tobacco-use.pack-years',
            )}: ${item.packYearsValue?.toString() || t('no-data')}`}>
            <ScrollView>
              <Modalinfo
                placeholder={t(
                  'medicalHistory.socialHistory.tobacco-use.dateStart',
                )}
                value={
                  dayjs(new Date(item.effectivePeriod?.start)).format(
                    DATE_FORMAT,
                  ) || t('no-data')
                }
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.socialHistory.tobacco-use.dateEnd',
                )}
                value={
                  dayjs(new Date(item.effectivePeriod?.end)).format(
                    DATE_FORMAT,
                  ) || t('no-data')
                }
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.socialHistory.tobacco-use.tobacco-status',
                )}
                value={item.tobaccoStatus?.display || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.socialHistory.tobacco-use.tobacco-type',
                )}
                value={item.tobaccoType?.display || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.socialHistory.tobacco-use.pack-years',
                )}
                value={item.packYearsValue?.toString() || t('no-data')}
              />
            </ScrollView>
          </InformationCard>
        )}
      />
      {loading && <Loading />}
    </View>
  );
};

export default TobbacoUse;

const styles = StyleSheet.create({
  containerHeight: {
    height: '100%',
  },
});
