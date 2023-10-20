import React, {useEffect} from 'react';
import {View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getMedicationSummary} from './api/medicalPersonalHistoryAPI';
import {getPatientId} from '../../../../common/features/tokenContext';
import {getFullDateDayMonthYear} from '../../../../common/features/dateTransformations';
import {IMedicationSummary} from './interface/IMedicationSummary';

const MedicationSummary = () => {
  const fetchData = async () => {
    const data = await getMedicationSummary(getPatientId());
    return data.data;
  };

  const [data, setData] = React.useState<IMedicationSummary[]>([]);

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
              type={'Allergies and Intolerances'}
              title={
                item.medication?.extension?.find(
                  extension => extension.medicationProduct !== null,
                )?.medicationProduct?.productName || '-'
              }
              TopSubtitle={item.dosage?.routeEDQM?.at(0)?.display || '-'}
              BottomSubtitle={
                item.medication?.extension?.find(
                  extension => extension.medicationProduct !== null,
                )?.medicationProduct?.strength || '-'
              }
              // risk={item.criticality?.display || '-'}
              status={item.status || '-'}
              onset={getFullDateDayMonthYear(item.effective?.dateTime) || '-'}
            />
          );
        })}
    </View>
  );
};

export default MedicationSummary;

const styles = {
  removeMargin: {
    marginBottom: 5,
  },
};
