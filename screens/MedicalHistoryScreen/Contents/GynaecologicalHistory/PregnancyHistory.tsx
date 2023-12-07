import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, ScrollView} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getPregnancyHistory} from './api/gynaecologicalHistoryAPI';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import dayjs from 'dayjs';
import Modalinfo from '../../../../components/Modalinfo/Modalinfo';
import {useTranslation} from 'react-i18next';
import {IPregnancyStatus} from './interface/IPregnancyStatus';
import Loading from '../../../../components/Loading/Loading';
import {DATE_FORMAT} from '../../../../common/constants/constants';

const PregnancyHistory = () => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);

  const [data, setData] = React.useState<IPregnancyStatus[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const newData = await getPregnancyHistory(user.token, user.id);
      return newData.data.pregnancyStatus;
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
        renderItem={({item}) => {
          let expectedDate = t('not-applicable');
          let methodUsed = t('not-applicable');
          if (item.value?.code === 'LA15173-0') {
            expectedDate =
              dayjs(
                new Date(item.expectedDeliveryData?.at(0)?.dateOfDelivery),
              ).format(DATE_FORMAT) || t('no-data');
            methodUsed =
              item.expectedDeliveryData?.at(0)?.code?.display || t('no-data');
          }
          return (
            <InformationCard
              type={'Procedure'}
              title={item.value?.display || t('no-data')}
              TopSubtitle={`${t(
                'medicalHistory.gynecological.pregnancy-history.examinationDate',
              )}: ${
                dayjs(new Date(item.examinationDate)).format(DATE_FORMAT) ||
                t('no-data')
              }`}
              BottomSubtitle={`${t(
                'medicalHistory.gynecological.pregnancy-history.expectedDeliveryDate',
              )}: ${expectedDate}`}>
              <ScrollView>
                <Modalinfo
                  placeholder={t(
                    'medicalHistory.gynecological.pregnancy-history.examinationDate',
                  )}
                  value={
                    dayjs(new Date(item.examinationDate)).format(DATE_FORMAT) ||
                    t('no-data')
                  }
                />
                <Modalinfo
                  placeholder={t(
                    'medicalHistory.gynecological.pregnancy-history.expectedDeliveryDate',
                  )}
                  value={expectedDate}
                />
                <Modalinfo
                  placeholder={t(
                    'medicalHistory.gynecological.pregnancy-history.method',
                  )}
                  value={methodUsed}
                />
              </ScrollView>
            </InformationCard>
          );
        }}
      />
      {loading && <Loading />}
    </View>
  );
};

export default PregnancyHistory;

const styles = StyleSheet.create({
  containerHeight: {
    height: '100%',
  },
});
