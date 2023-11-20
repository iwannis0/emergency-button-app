import React, {useEffect} from 'react';
import {View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getCurrentProblems} from './api/medicalPersonalHistoryAPI';
import {getFullDateDayMonthYear} from '../../../../common/features/dateTransformations';
import {ICurrentProblems} from './interface/ICurrentProblems';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';

const CurrentProblems = () => {
  const [user, _] = useRecoilState(userState);

  const fetchData = async () => {
    const data = await getCurrentProblems(user.token, user.id);
    return data.data;
  };

  const [data, setData] = React.useState<ICurrentProblems[]>([]);

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
                item.code?.icD10Code?.at(0)?.display ||
                item.code?.absentOrUnknownProblem?.at(0)?.display ||
                item.code?.otherCode?.at(0)?.display ||
                item.code?.coding?.at(0)?.display ||
                '-'
              }
              TopSubtitle={item.severity?.coding?.at(0)?.display || '-'}
              BottomSubtitle={getFullDateDayMonthYear(item.onset?.start) || '-'}
            />
          );
        })}
    </View>
  );
};

export default CurrentProblems;

const styles = {
  removeMargin: {
    marginBottom: 5,
  },
};
