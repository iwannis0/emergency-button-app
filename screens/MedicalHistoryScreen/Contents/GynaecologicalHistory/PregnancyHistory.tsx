import React, {useEffect} from 'react';
import {View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getFullDateDayMonthYear} from '../../../../common/features/dateTransformations';
import {getPregnancyHistory} from './api/gynaecologicalHistoryAPI';
import {IGynaecologicalHistory} from './interface/IGynaecologicalHistory';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';

const PregnancyHistory = () => {
  const [user, _] = useRecoilState(userState);

  const fetchData = async () => {
    const data = await getPregnancyHistory(user.token, user.id);
    return data.data;
  };

  const [data, setData] = React.useState<IGynaecologicalHistory>();

  useEffect(() => {
    fetchData().then(data => {
      setData(data);
    });
  }, []);

  return (
    <View style={styles.spaceBetween}>
      {data &&
        data.pregnancyStatus &&
        data.pregnancyStatus.length > 0 &&
        data.pregnancyStatus.map(item => {
          return (
            <InformationCard
              type={'Allergies and Intolerances'}
              title={item.value?.display || '-'}
              TopSubtitle={
                item.expectedDeliveryData?.at(0)?.code?.display || '-'
              }
              BottomSubtitle={
                getFullDateDayMonthYear(item.examinationDate) || '-'
              }
            />
          );
        })}
    </View>
  );
};

export default PregnancyHistory;

const styles = {
  spaceBetween: {
    marginBottom: 5,
  },
};
