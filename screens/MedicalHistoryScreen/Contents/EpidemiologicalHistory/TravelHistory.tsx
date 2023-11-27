import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {ITravelHistoryType} from './interface/ITravelHistoryType';
import {getTravelHistory} from './api/travelHistoryAPI';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import {DATE_FORMAT} from '../../../../common/constants/constants';
import dayjs from 'dayjs';
import Loading from '../../../../components/Loading/Loading';

const TravelHistory = () => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);

  const [page, setPage] = useState(1);
  const [data, setData] = React.useState<ITravelHistoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [noExtraData, setNoExtraData] = useState(false);

  const fetchData = async () => {
    try {
      const newData = await getTravelHistory(user.token, user.id, 10, page);
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
    setPage(prevPage => prevPage + 1);
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
            type={'Travel'}
            hasModal={false}
            title={item.value.display}
            TopSubtitle={dayjs(new Date(item.effectivePeriod.start)).format(
              DATE_FORMAT,
            )}
            BottomSubtitle={dayjs(new Date(item.effectivePeriod.end)).format(
              DATE_FORMAT,
            )}
          />
        )}
      />
      {loading && <Loading />}
    </View>
  );
};

export default TravelHistory;

const styles = {
  containerHeight: {
    height: '100%',
  },
};
