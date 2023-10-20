import React, {useEffect} from 'react';
import {View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getCurrentProblems} from './api/medicalPersonalHistoryAPI';
import {getPatientId} from '../../../../common/features/tokenContext';
import {getFullDateDayMonthYear} from '../../../../common/features/dateTransformations';
import {ICurrentProblems} from './interface/ICurrentProblems';

const CurrentProblems = () => {
  const fetchData = async () => {
    const data = await getCurrentProblems(getPatientId());
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
