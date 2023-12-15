import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../../assets/styles/scaling';

const styles = StyleSheet.create({
  modalHeight: {
    height: verticalScale(350),
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
  flatList: {
    shadowColor: '#000000',
    marginHorizontal: horizontalScale(10),
    width: horizontalScale(300),
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  backButton: {
    width: horizontalScale(120),
    height: verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: horizontalScale(170),
    backgroundColor: '#d9534a',
  },
  continueButton: {
    width: horizontalScale(120),
    height: verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    left: horizontalScale(150),
  },
  createButton: {
    width: horizontalScale(200),
    alignItems: 'center',
    justifyContent: 'center',
    left: horizontalScale(15),
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
    marginVertical: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginLeft: 20,
  },
  firstColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%', // Half width for 2 columns
  },
  secondColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
});

export default styles;
