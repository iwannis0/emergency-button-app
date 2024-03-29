import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getFunctionalStatus} from './api/medicalPersonalHistoryAPI';
import {IFunctionalStatus} from './interface/IFunctionalStatus';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import Loading from '../../../../components/Loading/Loading';
import dayjs from 'dayjs';
import {
  DATE_FORMAT,
  SYNCED_TIME_FORMAT,
} from '../../../../common/constants/constants';
import Modalinfo from '../../../../components/Modalinfo/Modalinfo';
import {useTranslation} from 'react-i18next';
import NoDataSection from '../../../../components/NoDataSection/NoDataSection';
import globalStyle from '../../../../assets/styles/globalStyle';
import NetInfo from '@react-native-community/netinfo';
import {patientSummaryState} from '../../../../features/recoil/atoms/PatientSummary/PatientSummaryState';

const FunctionalStatus = () => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);
  const [PatientSummary, __] = useRecoilState(patientSummaryState);
  const [data, setData] = React.useState<IFunctionalStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [synchDate, setSynchDate] = useState<Date>();

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
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        fetchData().then(newData => {
          setData(newData);
        });
        setSynchDate(new Date());
      } else {
        setData(PatientSummary.functionalStatus);
        setLoading(false);
        setSynchDate(PatientSummary.lastSynced);
      }
    });
  }, []);

  return (
    <View style={styles.containerHeight}>
      <Text style={globalStyle.descriptionItalic}>
        {t('dates.lastSynchronized')}:{' '}
        {dayjs(synchDate).format(SYNCED_TIME_FORMAT)}
      </Text>
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        data={data}
        renderItem={({item}) => (
          <InformationCard
            type={'Procedure'}
            title={item.result || '-'}
            TopSubtitle={`${t('dates.onset')}: ${
              dayjs(item.onsetDate).format(DATE_FORMAT) || t('general.no-data')
            }`}
            BottomSubtitle={`${t('dates.assessment')}: ${
              dayjs(item.assesmentDate).format(DATE_FORMAT) ||
              t('general.no-data')
            }`}>
            <ScrollView>
              <Modalinfo
                placeholder={t('dates.onset')}
                value={
                  dayjs(item.onsetDate).format(DATE_FORMAT) ||
                  t('general.no-data')
                }
              />
              <Modalinfo
                placeholder={t('dates.assessment')}
                value={
                  dayjs(item.assesment).format(DATE_FORMAT) ||
                  t('general.no-data')
                }
              />
              <Modalinfo
                placeholder={t('general.description')}
                value={item.result || t('general.no-data')}
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
