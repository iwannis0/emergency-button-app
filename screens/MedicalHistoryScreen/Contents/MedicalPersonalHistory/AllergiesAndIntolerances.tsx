import React, {useEffect, useState} from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getAllergyIntolerance} from './api/medicalPersonalHistoryAPI';
import {IAllergyType} from './interface/IAllergiesAndIntolerances';
import Loading from '../../../../components/Loading/Loading';
import {getFullDateDayMonthYear} from '../../../../common/features/dateTransformations';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import Modalinfo from '../../../../components/Modalinfo/Modalinfo';
import dayjs from 'dayjs';
import {DATE_FORMAT} from '../../../../common/constants/constants';
import {useTranslation} from 'react-i18next';

const AllergiesAndIntolerances = () => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);

  const [page, setPage] = useState(1);
  const [data, setData] = React.useState<IAllergyType[]>([]);
  const [loading, setLoading] = useState(true);
  const [noExtraData, setNoExtraData] = useState(false);

  const fetchData = async () => {
    try {
      const newData = await getAllergyIntolerance(
        user.token,
        user.id,
        10,
        page,
      );

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
            type={'Allergy'}
            title={
              item.code?.allergyIntoleranceDrugs?.display ||
              item.code?.allergyIntoleranceNoDrugs?.display ||
              item.code?.absentOrUnknownAllergyIntolerance?.display ||
              '-'
            }
            TopSubtitle={item.category?.at(0) || '-'}
            BottomSubtitle={
              item.typeExtensionExtraCode?.coding?.at(0)?.display || '-'
            }
            risk={item.criticality?.display || 'Undefined'}
            status={item.clinicalStatus?.coding?.at(0)?.display || '-'}
            onset={getFullDateDayMonthYear(item.onset?.onsetDateTime) || '-'}>
            <ScrollView>
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.allergies.category',
                )}
                value={item.category?.at(0) || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.allergies.type',
                )}
                value={
                  item.typeExtensionExtraCode?.coding?.at(0)?.display ||
                  t('no-data')
                }
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.allergies.substance',
                )}
                value={
                  item.code?.allergyIntoleranceDrugs?.display ||
                  item.code?.allergyIntoleranceNoDrugs?.display ||
                  item.code?.absentOrUnknownAllergyIntolerance?.display ||
                  t('no-data')
                }
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.allergies.status',
                )}
                value={
                  item.clinicalStatus?.coding?.at(0)?.display || t('no-data')
                }
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.allergies.criticality',
                )}
                value={item.criticality?.display || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.allergies.description',
                )}
                value={item.note?.at(0)?.text || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.allergies.onset',
                )}
                value={
                  dayjs(new Date(item.onset.onsetDateTime)).format(
                    DATE_FORMAT,
                  ) || t('no-data')
                }
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.allergies.last-occurrence',
                )}
                value={
                  dayjs(new Date(item.lastOccurrence)).format(DATE_FORMAT) ||
                  t('no-data')
                }
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.allergies.resolution',
                )}
                value={
                  dayjs(new Date(item.abatementDatetime)).format(DATE_FORMAT) ||
                  t('no-data')
                }
              />
              {item.reaction?.map((reaction, index) => (
                <View key={index}>
                  <Modalinfo
                    key={`Description-${index}`}
                    placeholder={`${t(
                      'medicalHistory.medicalPersonalHistory.allergies.reaction-description',
                    )} ${index + 1}`}
                    value={reaction.description || t('no-data')}
                  />
                  <Modalinfo
                    key={`Manifestation-${index}`}
                    placeholder={`${t(
                      'medicalHistory.medicalPersonalHistory.allergies.manifestation',
                    )} ${index + 1}`}
                    value={
                      reaction.allergyIntoleranceReactionManifestationGPSCode
                        ?.display || t('no-data')
                    }
                  />
                  <Modalinfo
                    key={`Severity-${index}`}
                    placeholder={`${t(
                      'medicalHistory.medicalPersonalHistory.allergies.severity',
                    )} ${index + 1}`}
                    value={
                      reaction?.severityExtensionExtraCode?.coding?.at(0)
                        ?.display || t('no-data')
                    }
                  />
                  <Modalinfo
                    key={`Exposure-${index}`}
                    placeholder={`${t(
                      'medicalHistory.medicalPersonalHistory.allergies.exposure',
                    )} ${index + 1} `}
                    value={reaction?.exposureRoute?.display || t('no-data')}
                  />
                  <Modalinfo
                    key={`Onset-${index}`}
                    placeholder={`${t(
                      'medicalHistory.medicalPersonalHistory.allergies.reaction-onset',
                    )} ${index + 1}`}
                    value={
                      dayjs(new Date(reaction.onsetDateTime)).format(
                        DATE_FORMAT,
                      ) || t('no-data')
                    }
                  />
                </View>
              ))}
            </ScrollView>
          </InformationCard>
        )}
      />
      {loading && <Loading />}
    </View>
  );
};

export default AllergiesAndIntolerances;

const styles = {
  containerHeight: {
    height: '100%',
  },
};
