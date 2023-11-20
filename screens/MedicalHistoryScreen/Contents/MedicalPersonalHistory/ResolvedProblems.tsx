import React, {useEffect} from 'react';
import {View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getResolvedProblems} from './api/medicalPersonalHistoryAPI';
import {getFullDateDayMonthYear} from '../../../../common/features/dateTransformations';
import {IResolvedProblems} from './interface/IResolvedProblems';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';

const ResolvedProblems = () => {
  const [user, _] = useRecoilState(userState);

  const fetchData = async () => {
    const data = await getResolvedProblems(user.token, user.id);
    return data.data;
  };

  const [data, setData] = React.useState<IResolvedProblems[]>([]);

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
              title={item.code?.coding?.at(0)?.display || '-'}
              TopSubtitle={item.severity?.coding?.at(0)?.display || '-'}
              BottomSubtitle={
                getFullDateDayMonthYear(item.onset?.dateTime) || '-'
              }
            />
          );
        })}
    </View>
  );
};

export default ResolvedProblems;

const styles = {
  removeMargin: {
    marginBottom: 5,
  },
};
