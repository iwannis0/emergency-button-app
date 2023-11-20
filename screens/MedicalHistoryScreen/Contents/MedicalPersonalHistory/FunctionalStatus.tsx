import React, {useEffect} from 'react';
import {View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getFunctionalStatus} from './api/medicalPersonalHistoryAPI';
import {getFullDateDayMonthYear} from '../../../../common/features/dateTransformations';
import {IFunctionalStatus} from './interface/IFunctionalStatus';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';

const FunctionalStatus = () => {
  const [user, _] = useRecoilState(userState);

  const fetchData = async () => {
    const data = await getFunctionalStatus(user.token, user.id);
    return data.data;
  };

  const [data, setData] = React.useState<IFunctionalStatus[]>([]);

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
              type={'Procedure'}
              title={
                item.value?.coding?.at(0)?.display || item.value?.text || '-'
              }
              TopSubtitle={
                getFullDateDayMonthYear(item.effectiveDateTime) || '-'
              }
            />
          );
        })}
    </View>
  );
};

export default FunctionalStatus;

const styles = {
  removeMargin: {
    marginBottom: 5,
  },
};
