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
  changeLanguageContainer: {
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(130),
  },
  changeLanguageText: {
    textAlign: 'center',
  },
  changeLanguage: {
    color: '#0C6C79',
    textDecorationLine: 'underline',
  },
  displayLanguageContainer: {
    alignItems: 'center',
    marginVertical: verticalScale(3),
  },
});

export default styles;
