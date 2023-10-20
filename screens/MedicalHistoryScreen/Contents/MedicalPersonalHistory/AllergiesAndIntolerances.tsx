import React, {useEffect} from 'react';
import {View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getAllergyIntolerance} from './api/medicalPersonalHistoryAPI';
import {IAllergyType} from './interface/IAllergiesAndIntolerances';
import {getPatientId} from '../../../../common/features/tokenContext';
import {getFullDateDayMonthYear} from '../../../../common/features/dateTransformations';

const AllergiesAndIntolerances = () => {
  const fetchData = async () => {
    const data = await getAllergyIntolerance(getPatientId());
    return data.data;
  };

  const [data, setData] = React.useState<IAllergyType[]>([]);

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
                item.code?.allergyIntoleranceDrugs?.display ||
                item.code?.allergyIntoleranceNoDrugs?.display ||
                item.code?.absentOrUnknownAllergyIntolerance?.display ||
                '-'
              }
              TopSubtitle={item.category || '-'}
              BottomSubtitle={
                item.typeExtensionExtraCode?.coding?.at(0)?.display || '-'
              }
              risk={item.criticality?.display || '-'}
              status={item.clinicalStatus?.coding?.at(0)?.display || '-'}
              onset={getFullDateDayMonthYear(item.onset?.onsetDateTime) || '-'}
            />
          );
        })}
    </View>
  );
};

export default AllergiesAndIntolerances;

const styles = {
  removeMargin: {
    marginBottom: 5,
  },
};
