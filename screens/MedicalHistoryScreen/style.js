import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';

const styles = StyleSheet.create({
  button: {
    width: horizontalScale(130),
    height: verticalScale(25),
    backgroundColor: '#0C6C79',
    borderRadius: scaleFontSize(5),
    marginTop: verticalScale(10),
    flexDirection: 'row',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: scaleFontSize(16),
    marginLeft: horizontalScale(5),
  },
  buttonsRow: {
    flexDirection: 'row',
    width: horizontalScale(270),
    justifyContent: 'space-between',
  },
  background: {
    backgroundColor: '#F5F5F7',
    height: '100%',
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
