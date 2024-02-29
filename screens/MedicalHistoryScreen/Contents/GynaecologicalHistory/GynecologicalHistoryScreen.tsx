import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import globalStyle from '../../../../assets/styles/globalStyle';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import {IGynecological} from './interface/IGynecological';
import {getPregnancyInfo} from './api/gynaecologicalHistoryAPI';
import dayjs from 'dayjs';
import {DATE_FORMAT} from '../../../../common/constants/constants';
import {
  horizontalScale,
  verticalScale,
} from '../../../../assets/styles/scaling';
import NoDataSection from '../../../../components/NoDataSection/NoDataSection';
import Loading from '../../../../components/Loading/Loading';

const GynecologicalHistoryScreen = () => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);
  const [data, setData] = React.useState<IGynecological>();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      return await getPregnancyInfo(user.token, user.id, 'EN');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData().then(newData => {
      setData(newData);
    });
  }, []);

  if (!data?.availableInformation) {
    return (
      <SafeAreaView>
        <View style={[globalStyle.marginTop60, styles.container]}>
          <NoDataSection />
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView>
      <View style={[globalStyle.marginTop60, styles.container]}>
        <Text style={styles.marginTop}>{t('dates.expected-delivery')}:</Text>
        <Text style={globalStyle.descriptionBlackL1}>
          {data?.deliveryDate
            ? dayjs(data.deliveryDate).format(DATE_FORMAT)
            : t('general.no-data')}
        </Text>

        <Text style={styles.marginTop}>{t('dates.observation')}:</Text>
        <Text style={globalStyle.descriptionBlackL1}>
          {data?.observationDate
            ? dayjs(data.observationDate).format(DATE_FORMAT)
            : t('general.no-data')}
        </Text>

        <Text style={styles.marginTop}>
          {t('patientSummary.gynaecological.abortions')}:
        </Text>
        <Text style={globalStyle.descriptionBlackL1}>
          {data?.abortions || t('general.no-data')}
        </Text>

        <Text style={styles.marginTop}>
          {t('patientSummary.gynaecological.children')}:
        </Text>
        <Text style={globalStyle.descriptionBlackL1}>
          {data?.numberOfChildren || t('general.no-data')}
        </Text>
        <Text style={styles.marginTop}>{t('dates.outcome')}</Text>
        {data.numberOfChildren > 0 &&
          data?.outcomeDates.split(',').map((date, index) => (
            <Text style={globalStyle.descriptionBlackL1} key={index}>
              {dayjs(date).format(DATE_FORMAT)}
            </Text>
          ))}
      </View>
      {loading && <Loading />}
    </SafeAreaView>
  );
};

export default GynecologicalHistoryScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginLeft: horizontalScale(20),
  },
  marginTop: {
    marginTop: verticalScale(20),
  },
});
