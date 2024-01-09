import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../../../assets/styles/scaling';

const styles = StyleSheet.create({
  modalHeight: {
    height: verticalScale(485),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    left: horizontalScale(-15),
    marginHorizontal: horizontalScale(30),
    marginBottom: horizontalScale(5),
  },
  searchContainer: {
    marginHorizontal: horizontalScale(10),
    marginBottom: verticalScale(10),
  },
  searchInputText: {
    width: '100%',
  },
  searchInput: {
    width: '50%',
    height: verticalScale(35),
    marginLeft: horizontalScale(10),
    paddingHorizontal: horizontalScale(10),
    borderWidth: scaleFontSize(1),
    borderRadius: scaleFontSize(15),
    borderColor: 'rgba(0, 0, 0, 0.3)',
    backgroundColor: 'white',
  },
  flatList: {
    shadowColor: '#000000',
    marginLeft: horizontalScale(20),
    marginRight: horizontalScale(10),
  },
  backButton: {
    width: horizontalScale(135),
    height: verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: horizontalScale(165),
    backgroundColor: 'grey',
    marginTop: verticalScale(10),
  },
  continueButton: {
    width: horizontalScale(135),
    height: verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    left: horizontalScale(165),
    marginTop: verticalScale(10),
  },
});

export default styles;
