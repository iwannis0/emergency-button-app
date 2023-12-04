import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getProcedures} from './api/medicalPersonalHistoryAPI';
import {IProcedure} from './interface/IProcedure';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import {useTranslation} from 'react-i18next';
import Loading from '../../../../components/Loading/Loading';
import dayjs from 'dayjs';
import {DATE_FORMAT} from '../../../../common/constants/constants';
import Modalinfo from '../../../../components/Modalinfo/Modalinfo';

const Procedures = () => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);

  const [page, setPage] = useState(1);
  const [data, setData] = React.useState<IProcedure[]>([]);
  const [loading, setLoading] = useState(true);
  const [noExtraData, setNoExtraData] = useState(false);

  const fetchData = async () => {
    try {
      const newData = await getProcedures(user.token, user.id, 10, page);

      setPage(prevPage => prevPage + 1);
      if (newData.data.length === 0) {
        setNoExtraData(true);
      }
      return newData.data;
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

  const handleEndReached = async () => {
    if (noExtraData) {
      return;
    }
    const newData = await fetchData();
    setData(prevData => [...prevData, ...newData]);
  };

  return (
    <View style={styles.containerHeight}>
      <FlatList
        onEndReachedThreshold={0.5}
        onEndReached={handleEndReached}
        keyExtractor={(_, index) => index.toString()}
        data={data}
        renderItem={({item}) => (
          <InformationCard
            type={'Procedure'}
            title={
              item.code?.procedureDescription?.display ||
              item.code?.absentOrUnknownProcedure?.display ||
              item.code?.otherCode?.at(0)?.display ||
              t('no-data')
            }
            TopSubtitle={`${t(
              'medicalHistory.medicalPersonalHistory.problems.procedures.bodysite',
            )}: ${item.bodySite.at(0)?.display || t('no-data')}`}
            BottomSubtitle={`${t(
              'medicalHistory.medicalPersonalHistory.problems.procedures.date',
            )}: ${
              dayjs(new Date(item.performed.dateTime)).format(DATE_FORMAT) ||
              t('no-data')
            }`}>
            <ScrollView>
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.problems.procedures.bodysite',
                )}
                value={item.bodySite.at(0)?.display || t('no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'medicalHistory.medicalPersonalHistory.problems.procedures.date',
                )}
                value={
                  dayjs(new Date(item.performed.dateTime)).format(
                    DATE_FORMAT,
                  ) || t('no-data')
                }
              />
            </ScrollView>
          </InformationCard>
        )}
      />
      {loading && <Loading />}
    </View>
    // <View style={styles.removeMargin}>
    //   {data &&
    //     data.length > 0 &&
    //     data.map(item => {
    //       return (
    //         <InformationCard
    //           type={'Procedure'}
    //           title={
    //             item.code?.procedureDescription?.display ||
    //             item.code?.absentOrUnknownProcedure?.display ||
    //             item.code?.otherCode?.at(0)?.display ||
    //             '-'
    //           }
    //           TopSubtitle={item.bodySite?.at(0)?.display || '-'}
    //           BottomSubtitle={
    //             getFullDateDayMonthYear(item.performed?.dateTime) || '-'
    //           }
    //         />
    //       );
    //     })}
    // </View>
  );
};

export default Procedures;

const styles = StyleSheet.create({
  containerHeight: {
    height: '100%',
  },
});
