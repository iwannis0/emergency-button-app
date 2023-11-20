import React, {useEffect} from 'react';
import {View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getDevices} from './api/medicalPersonalHistoryAPI';
import {getFullDateDayMonthYear} from '../../../../common/features/dateTransformations';
import {IInitialDeviceAndImplants} from './interface/IDeviceAndImplants';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';

const DeviceAndImplants = () => {
  const [user, _] = useRecoilState(userState);

  const fetchData = async () => {
    const data = await getDevices(user.token, user.id);
    return data.data;
  };

  const [data, setData] = React.useState<IInitialDeviceAndImplants[]>([]);

  useEffect(() => {
    fetchData().then(data => {
      setData(data);
    });
  }, []);

  return (
    <View style={styles.removeMargin}>
      {data &&
        data.length > 0 &&
        data.map(item => {
          return (
            <InformationCard
              type={'Device'}
              title={
                item.device?.type?.snomedMedicalDevice?.at(0)?.display ||
                item.device?.type?.ipsAbsentOrUnknownDevice?.at(0)?.code ||
                '-'
              }
              TopSubtitle={
                getFullDateDayMonthYear(
                  item.procedures?.at(0)?.performed?.dateTime,
                ) || '-'
              }
              BottomSubtitle={
                getFullDateDayMonthYear(
                  item.procedures?.at(1)?.performed?.dateTime,
                ) || '-'
              }
            />
          );
        })}
    </View>
  );
};

export default DeviceAndImplants;

const styles = {
  removeMargin: {
    marginBottom: 5,
  },
};
