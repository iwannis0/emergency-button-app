import React, {useEffect} from 'react';
import {View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getResolvedProblems} from './api/medicalPersonalHistoryAPI';
import {getPatientId} from '../../../../common/features/tokenContext';
import {getFullDateDayMonthYear} from '../../../../common/features/dateTransformations';
import {IResolvedProblems} from './interface/IResolvedProblems';

const ResolvedProblems = () => {
  const fetchData = async () => {
    const data = await getResolvedProblems(getPatientId());
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
