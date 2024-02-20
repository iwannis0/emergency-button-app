import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  verticalScale,
  scaleFontSize,
} from '../../../../assets/styles/scaling';

const styles = StyleSheet.create({
  container: {
    marginLeft: horizontalScale(20),
    marginRight: horizontalScale(20),
  },
  labels: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: scaleFontSize(20),
  },
  inputs: {
    height: verticalScale(40),
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: scaleFontSize(5),
    marginTop: verticalScale(10),
    paddingLeft: horizontalScale(10),
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: scaleFontSize(16),
  },
  updateButton: {
    height: verticalScale(30),
    backgroundColor: '#0C6C79',
    borderRadius: scaleFontSize(5),
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#BDBDBD',
  },
  updateButtonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Inter',
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: scaleFontSize(17),
    marginLeft: horizontalScale(5),
  },
  deleteButton: {
    marginTop: verticalScale(40),
    height: verticalScale(40),
    backgroundColor: '#FF0000',
  },
});

export default styles;
