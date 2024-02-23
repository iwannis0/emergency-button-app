import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../../features/recoil/atoms/User/userState';
import {ISocialHistory} from '../interface/ISocialHistory';
import {getSocialHistory} from '../api/socialHistoryAPI';
import InformationCard from '../../../../../components/InformationCard/InformationCard';
import dayjs from 'dayjs';
import {DATE_FORMAT} from '../../../../../common/constants/constants';
import Modalinfo from '../../../../../components/Modalinfo/Modalinfo';
import NoDataSection from '../../../../../components/NoDataSection/NoDataSection';
import Loading from '../../../../../components/Loading/Loading';
import globalStyle from '../../../../../assets/styles/globalStyle';

const SocialHistoryScreen = () => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);
  const [data, setData] = React.useState<ISocialHistory[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      return await getSocialHistory(user.token, user.id, 'EN');
    } catch (error) {
      console.error(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData().then(newData => {
      setData(newData);
    });
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.containerHeight}>
        <View style={globalStyle.marginTop60}>
          <FlatList
            keyExtractor={(_, index) => index.toString()}
            data={data}
            renderItem={({item}) => (
              <InformationCard
                type={'Procedure'}
                title={item.type || t('no-data')}
                TopSubtitle={`${t('medicalHistory.socialHistory.from')} ${
                  item.startDate
                    ? dayjs(item.startDate).format(DATE_FORMAT) +
                      t('medicalHistory.socialHistory.until') +
                      item.endDate
                      ? dayjs(item.endDate).format(DATE_FORMAT)
                      : t('medicalHistory.socialHistory.present')
                    : t('no-data')
                }`}
                BottomSubtitle={`${item.value} ${item.unit}`}>
                <ScrollView>
                  <Modalinfo
                    placeholder={t('medicalHistory.socialHistory.onset')}
                    value={
                      item.startDate
                        ? dayjs(item.startDate).format(DATE_FORMAT)
                        : t('no-data')
                    }
                  />
                  <Modalinfo
                    placeholder={t('medicalHistory.socialHistory.endDate')}
                    value={
                      item.startDate
                        ? item.endDate
                          ? dayjs(item.endDate).format(DATE_FORMAT)
                          : t('medicalHistory.socialHistory.present')
                        : t('no-data')
                    }
                  />
                  <Modalinfo
                    placeholder={t('medicalHistory.socialHistory.frequency')}
                    value={
                      item.unit ? item.value + ' ' + item.unit : t('no-data')
                    }
                  />
                </ScrollView>
              </InformationCard>
            )}
            ListEmptyComponent={NoDataSection}
          />
          {loading && <Loading />}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SocialHistoryScreen;

const styles = StyleSheet.create({
  containerHeight: {
    height: '100%',
  },
});
