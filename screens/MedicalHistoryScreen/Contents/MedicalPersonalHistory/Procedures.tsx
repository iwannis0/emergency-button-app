import React, {useEffect} from 'react';
import {View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getProcedures} from './api/medicalPersonalHistoryAPI';
import {getFullDateDayMonthYear} from '../../../../common/features/dateTransformations';
import {IProcedure} from './interface/IProcedure';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';

const ProblemsAndProcedures = () => {
  const [user, _] = useRecoilState(userState);

  const fetchData = async () => {
    const data = await getProcedures(user.token, user.id);
    return data.data;
  };

  const [data, setData] = React.useState<IProcedure[]>([]);

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
                item.code?.procedureDescription?.display ||
                item.code?.absentOrUnknownProcedure?.display ||
                item.code?.otherCode?.at(0)?.display ||
                '-'
              }
              TopSubtitle={item.bodySite?.at(0)?.display || '-'}
              BottomSubtitle={
                getFullDateDayMonthYear(item.performed?.dateTime) || '-'
              }
            />
          );
        })}
    </View>
  );
};

export default ProblemsAndProcedures;

const styles = {
  removeMargin: {
    marginBottom: 5,
  },
};
