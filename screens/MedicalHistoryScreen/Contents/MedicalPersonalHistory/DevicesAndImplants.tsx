import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getDevices} from './api/medicalPersonalHistoryAPI';
import {IDeviceAndImplants} from './interface/IDeviceAndImplants';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import Loading from '../../../../components/Loading/Loading';
import Modalinfo from '../../../../components/Modalinfo/Modalinfo';
import dayjs from 'dayjs';
import {
  DATE_FORMAT,
  SYNCED_TIME_FORMAT,
} from '../../../../common/constants/constants';
import {useTranslation} from 'react-i18next';
import NoDataSection from '../../../../components/NoDataSection/NoDataSection';
import NetInfo from '@react-native-community/netinfo';
import {patientSummaryState} from '../../../../features/recoil/atoms/PatientSummary/PatientSummaryState';
import globalStyle from '../../../../assets/styles/globalStyle';

const DeviceAndImplants = () => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);
  const [PatientSummary, __] = useRecoilState(patientSummaryState);
  const [data, setData] = React.useState<IDeviceAndImplants[]>([]);
  const [loading, setLoading] = useState(true);
  const [synchDate, setSynchDate] = useState<Date>();

  const fetchData = async () => {
    try {
      return await getDevices(user.token, user.id, 'EN');
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
        setData(PatientSummary.devices);
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
        keyExtractor={(__, index) => index.toString()}
        data={data}
        renderItem={({item}) => {
          return (
            <InformationCard
              type={'Procedure'}
              title={item.name || t('general.no-data')}
              TopSubtitle={`${t('dates.onset')}: ${
                dayjs(item.implantDate).format(DATE_FORMAT) ||
                t('general.no-data')
              }`}
              BottomSubtitle={`${t('dates.removal')}: ${
                item.removalDate
                  ? t('general.no-data')
                  : dayjs(item.removalDate).format(DATE_FORMAT)
              }`}>
              <ScrollView>
                <Modalinfo
                  placeholder={t('dates.onset')}
                  value={
                    dayjs(item.implantDate).format(DATE_FORMAT) ||
                    t('general.no-data')
                  }
                />
                <Modalinfo
                  placeholder={t('dates.removal')}
                  value={
                    item.removalDate
                      ? t('general.no-data')
                      : dayjs(item.removalDate).format(DATE_FORMAT)
                  }
                />
              </ScrollView>
            </InformationCard>
          );
        }}
        ListEmptyComponent={NoDataSection}
      />
      {loading && <Loading />}
    </View>
  );
};

export default DeviceAndImplants;

const styles = StyleSheet.create({
  containerHeight: {
    height: '100%',
  },
});
