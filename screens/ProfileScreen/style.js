import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';

const styles = StyleSheet.create({
  ProfileContainer: {
    alignItems: 'center',
  },
  ImageContainer: {
    flexDirection: 'row',
  },
  ImageStyle: {
    left: horizontalScale(13),
    width: horizontalScale(60),
    height: horizontalScale(60),
  },
  ImageInitials: {
    right: horizontalScale(31),
    top: verticalScale(14),
    fontSize: scaleFontSize(26),
    color: '#00827B',
  },
  Name: {
    fontWeight: '700',
    fontSize: scaleFontSize(20),
    marginTop: verticalScale(10),
  },
  ButtonContainer: {
    marginTop: verticalScale(50),
  },
});

export default styles;
