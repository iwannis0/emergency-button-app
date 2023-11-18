import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import Subtitle from '../../../../components/Subtitle/Subtitle';
import {ITravelHistoryType} from './interface/ITravelHistoryType';
import {getTravelHistory} from './api/travelHistoryAPI';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';

const TravelHistory = () => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);
  const [data, setData] = React.useState<ITravelHistoryType[]>([]);

  const fetchData = async () => {
    const data = await getTravelHistory(user.token, user.id, 10, 1);
    return data.data;
  };

  useEffect(() => {
    fetchData().then(data => {
      setData(data);
    });
  }, []);

  return (
    <View style={styles.removeMargin}>
      <Subtitle title={t('Travel History')} />
      {data &&
        data.length > 0 &&
        data.map(item => {
          return (
            <InformationCard
              type={'Travel History'}
              title={item.value.display}
              TopSubtitle={item.effectivePeriod.start}
              BottomSubtitle={item.effectivePeriod.end}
            />
          );
        })}
    </View>
  );
};

export default TravelHistory;

const styles = {
  removeMargin: {
    marginTop: -20,
    marginBottom: 5,
  },
};
