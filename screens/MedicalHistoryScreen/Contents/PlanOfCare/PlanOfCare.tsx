import {useTranslation} from 'react-i18next';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import Modalinfo from '../../../../components/Modalinfo/Modalinfo';
import Loading from '../../../../components/Loading/Loading';
import {IPlanOfCare} from './interface/IPlanOfCare';
import {getPlanOfCare} from './api/planOfCareAPI';
import NoDataSection from '../../../../components/NoDataSection/NoDataSection';
import NetInfo from '@react-native-community/netinfo';
import {patientSummaryState} from '../../../../features/recoil/atoms/PatientSummary/PatientSummaryState';
import globalStyle from '../../../../assets/styles/globalStyle';
import dayjs from 'dayjs';
import {SYNCED_TIME_FORMAT} from '../../../../common/constants/constants';

const PlanOfCare = () => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);
  const [PatientSummary, __] = useRecoilState(patientSummaryState);
  const [data, setData] = React.useState<IPlanOfCare[]>([]);
  const [loading, setLoading] = useState(true);
  const [synchDate, setSynchDate] = useState<Date>();

  const fetchData = async () => {
    try {
      return await getPlanOfCare(user.token, user.id, 'EN');
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
        setData(PatientSummary.planOfCare);
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
            type={'PlanOfCare'}
            title={`${t('patientSummary.plan-of-care.recommendation')}: ${
              item.case || t('general.no-data')
            }`}
            TopSubtitle={item.description || t('general.no-data')}
            BottomSubtitle={''}>
            <ScrollView style={styles.containerHeight}>
              <Modalinfo
                placeholder={t('patientSummary.plan-of-care.recommendation')}
                value={item.description || t('general.no-data')}
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
export default PlanOfCare;

const styles = StyleSheet.create({
  containerHeight: {
    height: '100%',
  },
});
