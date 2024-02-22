import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getFunctionalStatus} from './api/medicalPersonalHistoryAPI';
import {IFunctionalStatus} from './interface/IFunctionalStatus';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import Loading from '../../../../components/Loading/Loading';
import dayjs from 'dayjs';
import {DATE_FORMAT} from '../../../../common/constants/constants';
import Modalinfo from '../../../../components/Modalinfo/Modalinfo';
import {useTranslation} from 'react-i18next';
import NoDataSection from '../../../../components/NoDataSection/NoDataSection';

const FunctionalStatus = () => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);
  const [data, setData] = React.useState<IFunctionalStatus[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      return await getFunctionalStatus(user.token, user.id, 'EN');
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
            type={'Procedure'}
            title={item.result || '-'}
            TopSubtitle={`${t(
              'medicalHistory.medicalPersonalHistory.problems.functional.onset',
            )}: ${dayjs(item.onsetDate) || t('no-data')}`}
            BottomSubtitle={`${t(
              'medicalHistory.medicalPersonalHistory.problems.functional.assesmentDate',
            )}: ${dayjs(item.assesmentDate) || t('no-data')}`}>
            <ScrollView>
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.problems.functional.onset',
                )}
                value={
                  dayjs(item.onsetDate).format(DATE_FORMAT) || t('no-data')
                }
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.problems.functional.assesmentDate',
                )}
                value={
                  dayjs(item.assesment).format(DATE_FORMAT) || t('no-data')
                }
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.problems.functional.description',
                )}
                value={item.result || t('no-data')}
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

export default FunctionalStatus;

const styles = StyleSheet.create({
  containerHeight: {
    height: '100%',
  },
});
