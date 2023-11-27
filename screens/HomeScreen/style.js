import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';

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

export default myHealthDashboardStyle;
