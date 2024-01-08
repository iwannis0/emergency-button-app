import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  verticalScale,
  scaleFontSize,
} from '../../../../assets/styles/scaling';

const styles = StyleSheet.create({
  infoContainer: {
    width: horizontalScale(290),
  },
  dates: {
    marginLeft: horizontalScale(20),
    fontWeight: '700',
    fontSize: scaleFontSize(20),
    marginBottom: verticalScale(10),
  },
  actionButtonsSHL: {
    width: horizontalScale(50),
    height: horizontalScale(50),
    borderRadius: scaleFontSize(30),
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(15),
    marginBottom: verticalScale(2),
  },
  actionButtotText: {
    fontSize: scaleFontSize(18),
    fontWeight: '700',
  },
  actionButtonRow: {
    flexDirection: 'row',
    width: '95%',
  },
  flipButton: {
    borderWidth: scaleFontSize(1),
    padding: horizontalScale(10),
    borderRadius: scaleFontSize(20),
    marginTop: verticalScale(15),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accessText: {
    marginTop: verticalScale(10),
    fontSize: scaleFontSize(28),
    fontWeight: '800',
    color: 'black',
  },
  pinText: {
    fontSize: scaleFontSize(20),
  },
  infoText: {
    fontSize: scaleFontSize(20),
    fontWeight: '700',
  },
});

export default styles;
