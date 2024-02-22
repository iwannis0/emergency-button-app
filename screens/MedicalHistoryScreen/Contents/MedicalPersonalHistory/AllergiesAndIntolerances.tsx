import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getAllergyIntolerance} from './api/medicalPersonalHistoryAPI';
import {IAllergyType} from './interface/IAllergiesAndIntolerances';
import Loading from '../../../../components/Loading/Loading';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import Modalinfo from '../../../../components/Modalinfo/Modalinfo';
import dayjs from 'dayjs';
import {DATE_FORMAT} from '../../../../common/constants/constants';
import {useTranslation} from 'react-i18next';

const AllergiesAndIntolerances = () => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);
  const [data, setData] = React.useState<IAllergyType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      return await getAllergyIntolerance(user.token, user.id, 'EN');
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
            type={'Allergy'}
            title={item.substance || t('no-data')}
            TopSubtitle={item.type || t('no-data')}
            BottomSubtitle={item.manifestation || t('no-data')}
            risk={item.criticality || 'Undefined'}
            status={item.status || '-'}
            onset={dayjs(new Date(item.onsetDate)).format(DATE_FORMAT) || '-'}>
            <ScrollView>
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.allergies.type',
                )}
                value={item.type || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.allergies.substance',
                )}
                value={item.substance || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.allergies.manifestation',
                )}
                value={item.manifestation || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.allergies.onsetDate',
                )}
                value={
                  dayjs(new Date(item.onsetDate)).format(DATE_FORMAT) ||
                  t('no-data')
                }
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.allergies.status',
                )}
                value={item.status || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.allergies.criticality',
                )}
                value={item.criticality || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.allergies.severity',
                )}
                value={item.severity || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.allergies.certainty',
                )}
                value={item.certainty || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.allergies.lastOccurence',
                )}
                value={
                  item.lastOccurenceDate
                    ? dayjs(item.lastOccurenceDate).format(DATE_FORMAT)
                    : t('no-data')
                }
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.allergies.resolutionDate',
                )}
                value={
                  item.resolutionDate
                    ? dayjs(item.resolutionDate).format(DATE_FORMAT)
                    : t('no-data')
                }
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.allergies.exposureRoute',
                )}
                value={item.exposureRoute || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.allergies.category',
                )}
                value={item.category || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.allergies.description',
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

export default AllergiesAndIntolerances;

const styles = StyleSheet.create({
  containerHeight: {
    height: '100%',
  },
});
