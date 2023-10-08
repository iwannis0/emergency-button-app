import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.21)',
  },
  modalView: {
    flex: 1,
    margin: verticalScale(130),
    width: horizontalScale(320),
    borderRadius: horizontalScale(10),
    shadowColor: '#0000000',
    shadowOffset: {
      width: horizontalScale(0),
      height: verticalScale(2),
    },
    shadowOpacity: 0.5,
    shadowRadius: horizontalScale(8),
    elevation: horizontalScale(10),
  },
  modaltitle: {
    marginTop: verticalScale(15),
    paddingHorizontal: horizontalScale(15),
    paddingBottom: verticalScale(10),
  },
  modalInformation: {
    width: '100%',
    flex: 1,
  },
});

export default styles;
