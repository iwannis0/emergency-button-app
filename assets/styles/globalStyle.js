import {StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize, verticalScale} from './scaling';

const globalStyle = StyleSheet.create({
  backgroundWhite: {
    backgroundColor: '#FFFFFF',
  },
  descriptionBlackL1: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: scaleFontSize(18),
    lineHeight: scaleFontSize(25),
    color: '#212121',
  },
  descriptionBlackL2: {
    fontFamily: 'Inter',
    fontWeight: '200',
    fontSize: scaleFontSize(16),
    lineHeight: scaleFontSize(20),
    color: '#212121',
  },
  descriptionBlackL3: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: scaleFontSize(14),
    lineHeight: scaleFontSize(16),
    color: '#212121',
  },
  descriptionGrey: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: scaleFontSize(16),
    lineHeight: scaleFontSize(20),
    color: '#888888',
  },
  subtitleBox: {
    width: 500,
    height: 29,
    marginTop: 20,
    marginLeft: 17,
  },
  row: {
    width: horizontalScale(317),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fullyCentered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginTop60: {
    marginTop: verticalScale(60),
  },
  Button: {
    width: horizontalScale(300),
    height: verticalScale(50),
    backgroundColor: '#0C6C79',
    borderRadius: scaleFontSize(10),
    marginTop: verticalScale(20),
    marginLeft: horizontalScale(25),
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: scaleFontSize(18),
  },
  bottomBorderL1: {
    borderBottomWidth: scaleFontSize(2),
    borderBottomColor: '#D2D2D2',
  },
  bottomBorderL2: {
    borderBottomWidth: scaleFontSize(2),
    borderBottomColor: '#E2E2E2',
    borderBottomStartRadius: scaleFontSize(40),
  },
  bottomBorderL3: {
    borderBottomWidth: scaleFontSize(1),
    borderBottomColor: '#C2C2C2',
  },
});

export default globalStyle;
