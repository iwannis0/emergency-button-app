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
            title={item.ingredient || t('general.no-data')}
            risk={item.status || t('general.no-data')}
            onset={
              item.startDate
                ? dayjs(item.startDate).format(DATE_FORMAT)
                : t('general.no-data')
            }
            TopSubtitle={`${t('patientSummary.medication-summary.strength')}: ${
              item.strength || t('general.no-data')
            }`}
            BottomSubtitle={`${t('dates.end')}: ${
              item.startDate
                ? dayjs(item.endDate).format(DATE_FORMAT)
                : t('general.no-data')
            }`}>
            <ScrollView>
              <Modalinfo
                placeholder={t('patientSummary.medication-summary.strength')}
                value={item.strength || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t('dates.onset')}
                value={
                  dayjs(item.startDate).format(DATE_FORMAT) ||
                  t('general.no-data')
                }
              />
              <Modalinfo
                placeholder={t('dates.end')}
                value={
                  dayjs(item.endDate).format(DATE_FORMAT) ||
                  t('general.no-data')
                }
              />
              <Modalinfo
                placeholder={t('patientSummary.medication-summary.frequency')}
                value={item.frequency || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t('patientSummary.medication-summary.dosage')}
                value={item.dosage || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t('patientSummary.medication-summary.form')}
                value={`${item.doseForm || t('general.no-data')}`}
              />
              <Modalinfo
                placeholder={t('general.status')}
                value={item.status || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'patientSummary.medication-summary.administration',
                )}
                value={item.routeOfAdministration || t('general.no-data')}
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
