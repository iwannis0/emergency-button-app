import React, {useEffect} from 'react';
import {View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getPregnancyOutcome} from './api/gynaecologicalHistoryAPI';
import {IGynaecologicalHistory} from './interface/IGynaecologicalHistory';
import {getFullDateDayMonthYear} from '../../../../common/features/dateTransformations';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';

const PregnancyOutcome = () => {
  const [user, _] = useRecoilState(userState);

  let totalBirths = 0;
  let totalAbortions = 0;
  let totalEctopicPregnancies = 0;
  let lastExaminationDate = '';

  const fetchData = async () => {
    const data = await getPregnancyOutcome(user.token, user.id);
    return data.data;
  };

  const [data, setData] = React.useState<IGynaecologicalHistory>();

  useEffect(() => {
    fetchData().then(data => {
      setData(data);
    });
  }, []);

  if (data && data.pregnancyOutcome && data.pregnancyOutcome.length > 0) {
    data.pregnancyOutcome.forEach(item => {
      if (item.code?.code === '11640-0' && item.value) {
        totalBirths = totalBirths + item.value;
      }

      if (item.code?.code === '11612-9' && item.value) {
        totalAbortions = totalAbortions + item.value;
      }

      if (item.code?.code === '33065-4' && item.value) {
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
      {data && data.pregnancyOutcome && data.pregnancyOutcome.length > 0 && (
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
      )}
    </View>
  );
};

export default PregnancyOutcome;

const styles = {
  spaceBetween: {
    marginBottom: 5,
  },
};
