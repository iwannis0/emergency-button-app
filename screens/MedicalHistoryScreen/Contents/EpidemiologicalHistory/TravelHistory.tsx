import React, {useEffect} from 'react';
import {View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import Subtitle from '../../../../components/Subtitle/Subtitle';
import {ITravelHistoryType} from './interface/ITravelHistoryType';
import {getTravelHistory} from './api/travelHistoryAPI';
import {useTranslation} from 'react-i18next';
import {getPatientId} from '../../../../common/tokenContext';

const TravelHistory = () => {
  const {t} = useTranslation();

  const fetchData = async () => {
    const data = await getTravelHistory(getPatientId());

    console.log(data.data);

    return data.data;
  };

  const [data, setData] = React.useState<ITravelHistoryType[]>([]);

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
