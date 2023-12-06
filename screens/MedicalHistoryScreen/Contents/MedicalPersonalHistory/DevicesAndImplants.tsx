import React, {useEffect, useState} from 'react';
import {View, FlatList, ScrollView, StyleSheet, Text} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getDevices} from './api/medicalPersonalHistoryAPI';
import {IDeviceAndImplants} from './interface/IDeviceAndImplants';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import Loading from '../../../../components/Loading/Loading';
import Modalinfo from '../../../../components/Modalinfo/Modalinfo';
import dayjs from 'dayjs';
import {DATE_FORMAT} from '../../../../common/constants/constants';
import {useTranslation} from 'react-i18next';

const DeviceAndImplants = () => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);

  const [page, setPage] = useState(1);
  const [data, setData] = React.useState<IDeviceAndImplants[]>([]);
  const [loading, setLoading] = useState(true);
  const [noExtraData, setNoExtraData] = useState(false);

  const fetchData = async () => {
    try {
      const newData = await getDevices(user.token, user.id, 10, page);
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
        renderItem={({item}) => {
          if (item.device.deviceName.at(0) == null) {
            let removalDate = '';
            if (item.procedures?.at(1)?.performed?.dateTime === undefined) {
              removalDate = '—';
            } else {
              removalDate =
                dayjs(
                  new Date(item.procedures?.at(1)?.performed?.dateTime),
                ).format(DATE_FORMAT) || t('no-data');
            }
            return (
              <InformationCard
                type={'Procedure'}
                title={
                  item.device?.type?.snomedMedicalDevice?.at(0)?.display ||
                  item.device?.type?.ipsAbsentOrUnknownDevice?.at(0)?.code ||
                  t('no-data')
                }
                TopSubtitle={`${t(
                  'medicalHistory.medicalPersonalHistory.devices.onset',
                )}: ${
                  dayjs(
                    new Date(item.procedures?.at(0)?.performed?.dateTime),
                  ).format(DATE_FORMAT) || t('no-data')
                }`}
                BottomSubtitle={`${t(
                  'medicalHistory.medicalPersonalHistory.devices.removal',
                )}: ${removalDate}`}>
                <ScrollView>
                  <Modalinfo
                    placeholder={t(
                      'medicalHistory.medicalPersonalHistory.devices.onset',
                    )}
                    value={
                      dayjs(
                        new Date(item.procedures?.at(0)?.performed?.dateTime),
                      ).format(DATE_FORMAT) || t('no-data')
                    }
                  />
                  <Modalinfo
                    placeholder={t(
                      'medicalHistory.medicalPersonalHistory.devices.removal',
                    )}
                    value={removalDate}
                  />
                </ScrollView>
              </InformationCard>
            );
          } else {
            return (
              <InformationCard
                type={'Procedure'}
                title={
                  item.device?.type?.snomedMedicalDevice?.at(0)?.display ||
                  item.device?.type?.ipsAbsentOrUnknownDevice?.at(0)?.code ||
                  t('no-data')
                }
                TopSubtitle={`${t(
                  'medicalHistory.medicalPersonalHistory.devices.name',
                )}: ${item.device.deviceName?.at(0)?.name || t('no-data')}
                }`}
                BottomSubtitle={`${t(
                  'medicalHistory.medicalPersonalHistory.devices.type',
                )}: ${item.device.deviceName?.at(0)?.type || t('no-data')}`}>
                <ScrollView>
                  <Modalinfo
                    placeholder={t(
                      'medicalHistory.medicalPersonalHistory.devices.name',
                    )}
                    value={item.device.deviceName?.at(0)?.name || t('no-data')}
                  />
                  <Modalinfo
                    placeholder={t(
                      'medicalHistory.medicalPersonalHistory.devices.type',
                    )}
                    value={item.device.deviceName?.at(0)?.type || t('no-data')}
                  />
                </ScrollView>
              </InformationCard>
            );
          }
        }}
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
