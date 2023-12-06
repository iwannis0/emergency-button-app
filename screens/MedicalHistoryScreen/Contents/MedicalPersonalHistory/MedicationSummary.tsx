import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, FlatList} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getMedicationSummary} from './api/medicalPersonalHistoryAPI';
import {IMedicationSummary} from './interface/IMedicationSummary';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import {useTranslation} from 'react-i18next';
import Loading from '../../../../components/Loading/Loading';
import dayjs from 'dayjs';
import {DATE_FORMAT} from '../../../../common/constants/constants';
import {getFullDateDayMonthYear} from '../../../../common/features/dateTransformations';
import Modalinfo from '../../../../components/Modalinfo/Modalinfo';

const MedicationSummary = () => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);

  const [page, setPage] = useState(1);
  const [data, setData] = React.useState<IMedicationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [noExtraData, setNoExtraData] = useState(false);

  const fetchData = async () => {
    try {
      const newData = await getMedicationSummary(user.token, user.id, 10, page);
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
            type={'Medication'}
            title={
              item.medication?.extension?.find(
                extension => extension.medicationProduct !== null,
              )?.medicationProduct?.productName || t('no-data')
            }
            risk={item.status || t('no-data')}
            onset={
              getFullDateDayMonthYear(item.effective?.dateTime) || t('no-data')
            }
            TopSubtitle={`${t(
              'medicalHistory.medicalPersonalHistory.medication.strength',
            )}: ${
              item.medication?.extension?.find(
                extension => extension.medicationProduct !== null,
              )?.medicationProduct?.strength || t('no-data')
            }`}
            BottomSubtitle={`every ${item.dosage.timing.repeat.period} ${item.dosage.timing.repeat.periodUnit.display} for ${item.dosage.timing.repeat.bounds.duration.value} ${item.dosage.timing.repeat.bounds.duration.unit}`}>
            <ScrollView>
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.medication.ingredient',
                )}
                value={item.medication.code.atcCode[0].display || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.medication.strength',
                )}
                value={
                  item.medication?.extension?.find(
                    extension => extension.medicationProduct !== null,
                  )?.medicationProduct?.strength || t('no-data')
                }
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.medication.onset',
                )}
                value={
                  dayjs(new Date(item.effective?.dateTime)).format(
                    DATE_FORMAT,
                  ) || t('no-data')
                }
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.medication.frequency',
                )}
                value={`every ${item.dosage.timing.repeat.period} ${item.dosage.timing.repeat.periodUnit.display} for ${item.dosage.timing.repeat.bounds.duration.value} ${item.dosage.timing.repeat.bounds.duration.unit}`}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.medication.dosage',
                )}
                value={`${item.dosage.doseAndRate[0].doseQuantity.decimalValue} ${item.dosage.doseAndRate[0].doseQuantity.unit}`}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.medication.form',
                )}
                value={`${
                  item.medication.form.edqmCode[0].display || t('no-data')
                }`}
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
                value={item.dosage?.routeEDQM?.at(0)?.display || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.medication.info',
                )}
                value={item.note?.at(0)?.text || t('no-data')}
              />
            </ScrollView>
          </InformationCard>
        )}
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
