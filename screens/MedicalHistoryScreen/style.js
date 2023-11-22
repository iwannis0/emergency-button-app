import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';

const styles = StyleSheet.create({
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
