import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getFullDateDayMonthYear} from '../../../../common/features/dateTransformations';
import {getPregnancyHistory} from './api/gynaecologicalHistoryAPI';
import {IGynaecologicalHistory} from './interface/IGynaecologicalHistory';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';

const PregnancyHistory = () => {
  const [data, setData] = React.useState<IGynaecologicalHistory>();
  const [error, setError] = React.useState(false);
  const [user, _] = useRecoilState(userState);

  const fetchData = async () => {
    return await getPregnancyHistory(user.token, user.id)
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log(error);
        setError(true);
        return null;
      });
  };

  useEffect(() => {
    fetchData().then(data => {
      if (data) {
        setData(data.data);
      }
    });
  }, []);

  return (
    <View style={styles.spaceBetween}>
      {data && data.pregnancyStatus && data.pregnancyStatus.length > 0
        ? data.pregnancyStatus.map((item, index) => {
            return (
              <InformationCard
                key={index}
                type={'Allergies and Intolerances'}
                title={item.value?.display || '-'}
                TopSubtitle={
                  item.expectedDeliveryData?.at(0)?.code?.display || '-'
                }
                BottomSubtitle={
                  getFullDateDayMonthYear(item.examinationDate) || '-'
                }
              />
            );
          })
        : error && (
            <Text style={styles.error}>
              There was an error while fetching data
            </Text>
          )}
    </View>
  );
};

export default PregnancyHistory;

const styles = StyleSheet.create({
  spaceBetween: {
    marginBottom: 5,
  },
  error: {
    textAlign: 'center',
    color: 'red',
  },
});
