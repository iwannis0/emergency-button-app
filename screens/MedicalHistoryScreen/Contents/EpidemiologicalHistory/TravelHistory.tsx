import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import Subtitle from '../../../../components/Subtitle/Subtitle';
import {ITravelHistoryType} from './interface/ITravelHistoryType';
import {getTravelHistory} from './api/travelHistoryAPI';
import {useTranslation} from 'react-i18next';
import {useRecoilValue} from 'recoil';
import {
  idSelector,
  tokenSelector,
} from '../../../../features/recoil/selectors/userSelectors';
import DataLoader from '../../../../components/DataLoader/DataLoader';

const TravelHistory = () => {
  const [loading, setLoading] = useState(true);
  const {t} = useTranslation();
  const patientId = useRecoilValue(idSelector);
  const token = useRecoilValue(tokenSelector);

  const fetchData = async () => {
    const data = await getTravelHistory('', 10, 1, patientId, token);
    return data.data;
  };

  const [data, setData] = React.useState<ITravelHistoryType[]>([]);

  useEffect(() => {
    fetchData().then(data => {
      setData(data);
      setLoading(false);
    });
  }, []);

  return (
    <View style={styles.removeMargin}>
      <Subtitle title={t('Travel History')} />
      {loading ? (
        <DataLoader />
      ) : (
        <>
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
        </>
      )}
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
