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
    justifyContent: 'center',
  },
  ButtonContainer: {
    marginTop: verticalScale(50),
  },
  informationContainer: {
    marginTop: verticalScale(20),
    marginLeft: horizontalScale(20),
  },
  descriptions: {
    color: '#00827B',
    fontSize: scaleFontSize(16),
    fontWeight: '600',
    marginBottom: verticalScale(10),
  },
  sections: {
    borderBottomWidth: 1,
    borderBottomEndRadius: horizontalScale(30),
    borderColor: 'rgba(0, 130, 123, 0.15)',
    marginBottom: verticalScale(15),
  },
  combinedsections: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  width220: {
    width: verticalScale(190),
  },
  width150: {
    width: verticalScale(130),
  },
  marginTop30: {
    marginTop: verticalScale(30),
  },
});

export default styles;
