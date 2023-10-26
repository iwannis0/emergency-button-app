import {StyleSheet} from 'react-native';
import {scaleFontSize} from '../../assets/styles/scaling';

const styles = StyleSheet.create({
  loadingContainer: {
    display: 'flex',
    position: 'center',
    height: '5%',
    width: '100%',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{scale: 0.5}],
    marginTop: '10%',
  },
  loadingText: {
    fontSize: scaleFontSize(18),
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#0B3F6B',
    textAlign: 'center',
    marginTop: '10%',
  },
});

export default styles;
