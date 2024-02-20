import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  infoIconContainer: {
    position: 'absolute',
    top: verticalScale(12),
    right: horizontalScale(15),
    borderWidth: scaleFontSize(2.5),
    borderRadius: scaleFontSize(20),
    padding: horizontalScale(4),
    borderColor: '#212121',
  },
  infoContainer: {
    marginTop: verticalScale(15),
    marginLeft: horizontalScale(20),
    marginRight: horizontalScale(30),
    textAlign: 'justify',
  },
  myLinksText: {
    marginTop: verticalScale(50),
    marginLeft: horizontalScale(10),
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: scaleFontSize(25),
    lineHeight: scaleFontSize(25),
    color: '#212121',
  },
});

export default styles;
