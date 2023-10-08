import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: verticalScale(60),
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: scaleFontSize(1),
    justifyContent: 'center',
  },
  modalText: {
    marginLeft: horizontalScale(20),
  },
});

export default styles;
