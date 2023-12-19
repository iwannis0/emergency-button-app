import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  verticalScale,
  scaleFontSize,
} from '../../../assets/styles/scaling';

const styles = StyleSheet.create({
  container: {
    padding: horizontalScale(10),
    marginHorizontal: horizontalScale(15),
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerText: {
    flex: 0.5,
    justifyContent: 'center',
  },
  containerButton: {
    flex: 0.3,
    justifyContent: 'center',
    backgroundColor: '#0C6C79',
    borderRadius: scaleFontSize(5),
    height: verticalScale(40),
    marginHorizontal: horizontalScale(2),
  },
  containerButtonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: scaleFontSize(14),
  },
  deleteButtonColor: {
    backgroundColor: '#b32034',
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
