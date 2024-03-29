import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getProcedures} from './api/medicalPersonalHistoryAPI';
import {IProcedure} from './interface/IProcedure';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import {useTranslation} from 'react-i18next';
import Loading from '../../../../components/Loading/Loading';
import dayjs from 'dayjs';
import {
  DATE_FORMAT,
  SYNCED_TIME_FORMAT,
} from '../../../../common/constants/constants';
import Modalinfo from '../../../../components/Modalinfo/Modalinfo';
import NoDataSection from '../../../../components/NoDataSection/NoDataSection';
import globalStyle from '../../../../assets/styles/globalStyle';
import NetInfo from '@react-native-community/netinfo';
import {patientSummaryState} from '../../../../features/recoil/atoms/PatientSummary/PatientSummaryState';

const Procedures = () => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);
  const [PatientSummary, __] = useRecoilState(patientSummaryState);
  const [data, setData] = React.useState<IProcedure[]>([]);
  const [loading, setLoading] = useState(true);
  const [synchDate, setSynchDate] = useState<Date>();

  const fetchData = async () => {
    try {
      return await getProcedures(user.token, user.id, 'EN');
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
        setData(PatientSummary.procedures);
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
            title={item.description || t('general.no-data')}
            TopSubtitle={`${t('patientSummary.problems.body-site')}: ${
              item.bodysite || t('general.no-data')
            }`}
            BottomSubtitle={`${t('dates.procedure')}: ${
              dayjs(item.procedureDate).format(DATE_FORMAT) ||
              t('general.no-data')
            }`}>
            <ScrollView>
              <Modalinfo
                placeholder={t('patientSummary.problems.body-site')}
                value={item.bodysite || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t('dates.procedure')}
                value={
                  dayjs(item.procedureDate).format(DATE_FORMAT) ||
                  t('general.no-data')
                }
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

export default Procedures;

const styles = StyleSheet.create({
  containerHeight: {
    height: '100%',
  },
});
