import {useTranslation} from 'react-i18next';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import Loading from '../../../../components/Loading/Loading';
import {IImmunizationFlatten} from './interface/IImmunization';
import {getImmunization} from './api/immunizationAPI';
import Modalinfo from '../../../../components/Modalinfo/Modalinfo';
import dayjs from 'dayjs';
import {DATE_FORMAT} from '../../../../common/constants/constants';

const AlcoholConsumption = (props: any) => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);

  const [page, setPage] = useState(1);
  const [data, setData] = React.useState<IImmunizationFlatten[]>([]);
  const [loading, setLoading] = useState(true);
  const [noExtraData, setNoExtraData] = useState(false);

  const fetchData = async () => {
    try {
      const newData = await getImmunization(user.token, user.id, 10, page);

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
            type={'Immunization'}
            title={item.diseaseOrAgentTargeted?.display || t('no-data')}
            TopSubtitle={`${t(
              'medicalHistory.immunization.date',
              // Possible error
            )}: ${
              dayjs(item.dateOfVaccination).format(DATE_FORMAT) || t('no-data')
            }`}
            BottomSubtitle={`${t(
              'medicalHistory.immunization.number-doses',
            )}: ${item.numberInSeries?.toString() || t('no-data')}`}>
            <ScrollView>
              <Modalinfo
                placeholder={t('medicalHistory.immunization.date')}
                value={
                  dayjs(item.dateOfVaccination).format(DATE_FORMAT) ||
                  t('no-data')
                }
              />
              <Modalinfo
                placeholder={t('medicalHistory.immunization.vaccine-code')}
                value={item.vaccineCode?.display || t('no-data')}
              />
              <Modalinfo
                placeholder={t('medicalHistory.immunization.disease-targeted')}
                value={item.diseaseOrAgentTargeted?.display || t('no-data')}
              />
              <Modalinfo
                placeholder={t('medicalHistory.immunization.number-doses')}
                value={item.numberInSeries?.toString() || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.immunization.details.medicinal-product',
                )}
                value={item.vaccineMedicinalProduct || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.immunization.details.auth-holder',
                )}
                value={item.vaccineMarketingAuthorizationHolder || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.immunization.details.batch-number',
                )}
                value={item.vaccineBatchNumber || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.immunization.details.admin-center',
                )}
                value={item.vaccineAdministeringCentre || t('no-data')}
              />
              <Modalinfo
                placeholder={t('medicalHistory.immunization.details.country')}
                value={item.vaccineCountryOfVaccination || t('no-data')}
              />
            </ScrollView>
          </InformationCard>
        )}
      />
      {loading && <Loading />}
    </View>
  );
};
export default AlcoholConsumption;

const styles = StyleSheet.create({
  containerHeight: {
    height: '100%',
  },
});
