import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getPregnancyOutcome} from './api/gynaecologicalHistoryAPI';
import {IGynaecologicalHistory} from './interface/IGynaecologicalHistory';
import {getFullDateDayMonthYear} from '../../../../common/features/dateTransformations';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import {
  ABORTIONS,
  BIRTHS,
  ECTOPIC_PREGNANCIES,
} from './constants/PragnancyOutcomeCodes';

const PregnancyOutcome = () => {
  const [data, setData] = React.useState<IGynaecologicalHistory>();
  const [error, setError] = React.useState(false);
  const [user, _] = useRecoilState(userState);

  let totalBirths = 0;
  let totalAbortions = 0;
  let totalEctopicPregnancies = 0;
  let lastExaminationDate = '';

  const fetchData = async () => {
    return await getPregnancyOutcome(user.token, user.id)
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

  if (data && data.pregnancyOutcome && data.pregnancyOutcome.length > 0) {
    data.pregnancyOutcome.forEach(item => {
      if (item.code?.code === BIRTHS && item.value) {
        totalBirths = totalBirths + item.value;
      }

      if (item.code?.code === ABORTIONS && item.value) {
        totalAbortions = totalAbortions + item.value;
      }

      if (item.code?.code === ECTOPIC_PREGNANCIES && item.value) {
        totalEctopicPregnancies = totalEctopicPregnancies + item.value;
      }
    });

    lastExaminationDate = getFullDateDayMonthYear(
      data.pregnancyOutcome.reduce((prev, current) => {
        return prev.examinationDate > current.examinationDate ? prev : current;
      }).examinationDate,
    );
  }

  return (
    <View style={styles.spaceBetween}>
      {data && data.pregnancyOutcome && data.pregnancyOutcome.length > 0 ? (
        <InformationCard
          type={'Allergies and Intolerances'}
          title={lastExaminationDate || '-'}
          TopSubtitle={`Total Births: ${totalBirths.toString() || '-'}`}
          BottomSubtitle={`Total Abortions: ${
            totalAbortions.toString() || '-'
          }`}
          risk={`Total Ectopic Pregnancies: ${
            totalEctopicPregnancies.toString() || '-'
          }`}
        />
      ) : (
        error && (
          <Text style={styles.error}>
            There was an error while fetching data
          </Text>
        )
      )}
    </View>
  );
};

export default PregnancyOutcome;

const styles = StyleSheet.create({
  spaceBetween: {
    marginBottom: 5,
  },
  error: {
    textAlign: 'center',
    color: 'red',
  },
});
