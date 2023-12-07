import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getPregnancyOutcome} from './api/gynaecologicalHistoryAPI';
import {IGynaecologicalHistory} from './interface/IGynaecologicalHistory';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import {
  ABORTIONS,
  BIRTHS,
  ECTOPIC_PREGNANCIES,
} from './constants/PragnancyOutcomeCodes';
import dayjs from 'dayjs';
import {DATE_FORMAT} from '../../../../common/constants/constants';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native-gesture-handler';
import Modalinfo from '../../../../components/Modalinfo/Modalinfo';

const PregnancyOutcome = () => {
  const {t} = useTranslation();
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

    lastExaminationDate = dayjs(
      data.pregnancyOutcome.reduce((prev, current) => {
        return prev.examinationDate > current.examinationDate ? prev : current;
      }).examinationDate,
    ).format(DATE_FORMAT);
  }

  return (
    <View style={styles.spaceBetween}>
      {data && data.pregnancyOutcome && data.pregnancyOutcome.length > 0 ? (
        <InformationCard
          type={'Procedure'}
          title={`${t(
            'medicalHistory.gynecological.pregnancy-history.examinationDate',
          )}: ${lastExaminationDate || t('no-data')}`}
          TopSubtitle={`${t(
            'medicalHistory.gynecological.pregnancy-outcome.births',
          )}: ${totalBirths.toString() || t('no-data')}`}
          BottomSubtitle={`${t(
            'medicalHistory.gynecological.pregnancy-outcome.abortions',
          )}: ${totalAbortions.toString() || t('no-data')}`}>
          <ScrollView>
            <Modalinfo
              placeholder={t(
                'medicalHistory.gynecological.pregnancy-outcome.births',
              )}
              value={totalBirths.toString() || t('no-data')}
            />
            <Modalinfo
              placeholder={t(
                'medicalHistory.gynecological.pregnancy-outcome.abortions',
              )}
              value={totalAbortions.toString() || t('no-data')}
            />
            <Modalinfo
              placeholder={t(
                'medicalHistory.gynecological.pregnancy-outcome.ectopic',
              )}
              value={totalEctopicPregnancies.toString() || t('no-data')}
            />
          </ScrollView>
        </InformationCard>
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
