import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import globalStyle from '../../../../assets/styles/globalStyle';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import {IGynecological} from './interface/IGynecological';
import {getPregnancyInfo} from './api/gynaecologicalHistoryAPI';
import dayjs from 'dayjs';
import {DATE_FORMAT} from '../../../../common/constants/constants';
import {verticalScale} from '../../../../assets/styles/scaling';
import NoDataSection from '../../../../components/NoDataSection/NoDataSection';
import Loading from '../../../../components/Loading/Loading';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBaby,
  faCakeCandles,
  faChildren,
} from '@fortawesome/free-solid-svg-icons';
import styles from './styles';

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
        <View style={[styles.pregnancyContainer, styles.marginTop]}>
          <View style={styles.imageContainer}>
            <FontAwesomeIcon
              icon={faBaby}
              size={verticalScale(70)}
              color={'#f4fbff'}
            />
          </View>
          <View style={globalStyle.fullyCentered}>
            <Text style={globalStyle.descriptionGrey}>
              {t('dates.expected-delivery')}
            </Text>
            <Text style={globalStyle.descriptionBlackL1}>
              {data?.deliveryDate
                ? dayjs(data.deliveryDate).format(DATE_FORMAT)
                : t('general.no-data')}
            </Text>
          </View>

          <View style={[styles.marginTop, globalStyle.fullyCentered]}>
            <Text style={globalStyle.descriptionGrey}>
              {t('dates.observation')}
            </Text>
            <Text style={globalStyle.descriptionBlackL1}>
              {data?.observationDate
                ? dayjs(data.observationDate).format(DATE_FORMAT)
                : t('general.no-data')}
            </Text>
          </View>

          <View style={[styles.marginTop, styles.childerContainer]}>
            <FontAwesomeIcon icon={faChildren} size={verticalScale(40)} />
            <Text style={[globalStyle.descriptionGrey, styles.childerMargins]}>
              {t('patientSummary.gynaecological.children')}
            </Text>
          </View>
          <Text style={globalStyle.descriptionBlackL1}>
            {data?.numberOfChildren || t('general.no-data')}
          </Text>

          <View style={styles.birthdaysContainer}>
            <FontAwesomeIcon icon={faCakeCandles} size={30} />
            <Text style={[globalStyle.descriptionGrey, styles.birthdaysText]}>
              {t('dates.outcome')}
            </Text>
          </View>

          {data.numberOfChildren > 0 &&
            data?.outcomeDates.split(',').map((date, index) => (
              <Text style={globalStyle.descriptionBlackL1} key={index}>
                {dayjs(date).format(DATE_FORMAT)}
              </Text>
            ))}

          <Text style={[styles.marginTop, globalStyle.descriptionGrey]}>
            {t('patientSummary.gynaecological.abortions')}
          </Text>
          <Text style={globalStyle.descriptionBlackL1}>
            {data?.abortions || t('general.no-data')}
          </Text>
        </View>
      </View>
      {loading && <Loading />}
    </SafeAreaView>
  );
};

export default GynecologicalHistoryScreen;
