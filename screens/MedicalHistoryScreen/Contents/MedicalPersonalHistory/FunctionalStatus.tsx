import React, {useEffect} from 'react';
import {View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getFunctionalStatus} from './api/medicalPersonalHistoryAPI';
import {getPatientId} from '../../../../common/features/tokenContext';
import {getFullDateDayMonthYear} from '../../../../common/features/dateTransformations';
import {IFunctionalStatus} from './interface/IFunctionalStatus';

const FunctionalStatus = () => {
  const fetchData = async () => {
    const data = await getFunctionalStatus(getPatientId());
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
