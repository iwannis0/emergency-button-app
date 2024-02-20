import {useTranslation} from 'react-i18next';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import Loading from '../../../../components/Loading/Loading';
import {IVaccination} from './interface/IVaccination';
import {getVaccination} from './api/vaccinationAPI';
import Modalinfo from '../../../../components/Modalinfo/Modalinfo';
import dayjs from 'dayjs';
import {DATE_FORMAT} from '../../../../common/constants/constants';
import NoDataSection from '../../../../components/NoDataSection/NoDataSection';

const Vaccination = () => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);
  const [data, setData] = React.useState<IVaccination[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      return await getVaccination(user.token, user.id, 'EN');
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
            type={'Immunization'}
            title={item.vaccine || t('no-data')}
            TopSubtitle={`${t(
              'medicalHistory.immunization.date',
              // Possible error
            )}: ${
              dayjs(item.vaccinationDate).format(DATE_FORMAT) || t('no-data')
            }`}
            BottomSubtitle={`${t(
              'medicalHistory.immunization.number-doses',
            )}: ${item.doseNumber || t('no-data')}`}>
            <ScrollView>
              <Modalinfo
                placeholder={t('medicalHistory.immunization.date')}
                value={
                  dayjs(item.vaccinationDate).format(DATE_FORMAT) ||
                  t('no-data')
                }
              />
              <Modalinfo
                placeholder={t('medicalHistory.immunization.brand')}
                value={item.brand || t('no-data')}
              />
              <Modalinfo
                placeholder={t('medicalHistory.immunization.brand')}
                value={item.disease || t('no-data')}
              />
              <Modalinfo
                placeholder={t('medicalHistory.immunization.holder')}
                value={item.holder || t('no-data')}
              />
              <Modalinfo
                placeholder={t('medicalHistory.immunization.doseNumber')}
                value={item.doseNumber || t('no-data')}
              />
              <Modalinfo
                placeholder={t('medicalHistory.immunization.batch')}
                value={item.batch || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.immunization.administeringCenter',
                )}
                value={item.administeringCenter || t('no-data')}
              />
              <Modalinfo
                placeholder={t('medicalHistory.immunization.physician')}
                value={item.physician || t('no-data')}
              />
              <Modalinfo
                placeholder={t('medicalHistory.immunization.country')}
                value={item.country || t('no-data')}
              />
              <Modalinfo
                placeholder={t('medicalHistory.immunization.administered')}
                value={item.administered || t('no-data')}
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
export default Vaccination;

const styles = StyleSheet.create({
  containerHeight: {
    height: '100%',
  },
});
