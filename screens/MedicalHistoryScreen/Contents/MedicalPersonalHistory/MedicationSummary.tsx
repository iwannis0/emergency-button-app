import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import Modalinfo from '../../../../components/Modalinfo/Modalinfo';
import Loading from '../../../../components/Loading/Loading';
import {getMedicationSummary} from './api/medicalPersonalHistoryAPI';
import {IMedicationSummary} from './interface/IMedicationSummary';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import dayjs from 'dayjs';
import {DATE_FORMAT} from '../../../../common/constants/constants';
import NoDataSection from '../../../../components/NoDataSection/NoDataSection';

const MedicationSummary = () => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);
  const [data, setData] = React.useState<IMedicationSummary[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      return await getMedicationSummary(user.token, user.id, 'EN');
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
            type={'Medication'}
            title={item.ingredient || t('no-data')}
            risk={item.status || t('no-data')}
            onset={
              item.startDate
                ? dayjs(item.startDate).format(DATE_FORMAT)
                : t('no-data')
            }
            TopSubtitle={`${t(
              'medicalHistory.medicalPersonalHistory.medication.strength',
            )}: ${item.strength || t('no-data')}`}
            BottomSubtitle={`${t(
              'medicalHistory.medicalPersonalHistory.medication.endDate',
            )}: ${
              item.startDate
                ? dayjs(item.endDate).format(DATE_FORMAT)
                : t('no-data')
            }`}>
            <ScrollView>
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.medication.strength',
                )}
                value={item.strength || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.medication.onset',
                )}
                value={
                  dayjs(item.startDate).format(DATE_FORMAT) || t('no-data')
                }
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.medication.endDate',
                )}
                value={dayjs(item.endDate).format(DATE_FORMAT) || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.medication.frequency',
                )}
                value={item.frequency || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.medication.dosage',
                )}
                value={item.dosage || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.medication.form',
                )}
                value={`${item.doseForm || t('no-data')}`}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.medication.status',
                )}
                value={item.status || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.medication.administration',
                )}
                value={item.routeOfAdministration || t('no-data')}
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

export default MedicationSummary;

const styles = StyleSheet.create({
  containerHeight: {
    height: '100%',
  },
});
