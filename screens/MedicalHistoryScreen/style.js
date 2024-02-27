import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';

const styles = StyleSheet.create({
  PersonalHistoryContainer: {
    width: '90%',
    marginLeft: horizontalScale(35),
  },
  PersonalHistoryTitle: {
    marginTop: verticalScale(15),
    marginLeft: horizontalScale(-10),
  },
});

export default styles;
