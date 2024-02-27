import {StyleSheet} from 'react-native';
import {verticalScale} from '../../assets/styles/scaling';

const myHealthDashboardStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingBottom: verticalScale(20),
  },
  ImageContainer: {
    position: 'absolute',
    top: 13,
    right: 13,
  },
  ImageStyle: {
    width: 35,
    height: 35,
  },
  ImageInitials: {
    position: 'absolute',
    top: 7,
    left: 9,
    color: '#00827B',
  },
});

export default myHealthDashboardStyle;
