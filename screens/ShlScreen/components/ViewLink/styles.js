import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  verticalScale,
  scaleFontSize,
} from '../../../../assets/styles/scaling';

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: verticalScale(-20),
    marginBottom: verticalScale(15),
    textAlign: 'left',
    width: horizontalScale(270),
    right: horizontalScale(10),
  },
  dates: {
    marginLeft: horizontalScale(20),
    fontWeight: '700',
    fontSize: scaleFontSize(20),
  },
  actionButtonsSHL: {
    width: horizontalScale(130),
    height: verticalScale(25),
    backgroundColor: '#0C6C79',
    borderRadius: scaleFontSize(5),
    marginTop: verticalScale(10),
    flexDirection: 'row',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: scaleFontSize(16),
    marginLeft: horizontalScale(5),
  },
  actionButtonRow: {
    flexDirection: 'row',
    width: horizontalScale(270),
    justifyContent: 'space-between',
  },
  pinContainer: {
    marginTop: verticalScale(10),
    fontSize: scaleFontSize(20),
    borderWidth: scaleFontSize(1),
    padding: horizontalScale(4),
    backgroundColor: 'rgba(12, 108, 121, 0.09)',
    borderRadius: scaleFontSize(5),
  },
});

export default styles;
