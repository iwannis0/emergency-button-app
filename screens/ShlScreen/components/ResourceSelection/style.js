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
    marginHorizontal: horizontalScale(10),
  },
  backButton: {
    width: horizontalScale(120),
    height: verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: horizontalScale(170),
    backgroundColor: 'grey',
  },
  continueButton: {
    width: horizontalScale(120),
    height: verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    left: horizontalScale(170),
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 2,
  },
  errorText: {
    color: 'red',
  },
  inputContainer: {
    marginVertical: 15,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginLeft: 20,
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
});

export default styles;
