import {StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize, verticalScale} from './scaling';

const globalStyle = StyleSheet.create({
  backgroundWhite: {
    backgroundColor: '#FFFFFF',
  },
  descriptionBlack: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: scaleFontSize(18),
    lineHeight: scaleFontSize(22),
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
  informationCardContainer: {
    borderRadius: 10,
    marginHorizontal: 7,
    shadowOffset: {width: 1, height: 4, borderRadius: 20},
    shadowColor: 'rgba(212, 212, 212)',
    shadowOpacity: 0.75,
    elevation: 5,
  },
});

export default globalStyle;
