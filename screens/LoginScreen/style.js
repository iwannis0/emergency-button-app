import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';

const styles = StyleSheet.create({
  ImageContainer: {
    height: verticalScale(215),
  },
  LoginContainer: {
    borderTopLeftRadius: scaleFontSize(20),
    borderTopRightRadius: scaleFontSize(20),
  },
  PasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  login: {
    fontWeight: '700',
    marginTop: verticalScale(30),
    marginLeft: horizontalScale(24),
  },
  input: {
    width: horizontalScale(300),
    height: verticalScale(50),
    borderColor: '#D8D8D8',
    borderWidth: scaleFontSize(2),
    marginTop: verticalScale(20),
    marginLeft: horizontalScale(25),
    paddingLeft: horizontalScale(15),
    borderRadius: scaleFontSize(10),
  },
  passwordIcon: {
    right: horizontalScale(45),
    top: verticalScale(10),
  },
  Button: {
    width: horizontalScale(300),
    height: verticalScale(50),
    backgroundColor: '#0C6C79',
    borderRadius: scaleFontSize(10),
    marginTop: verticalScale(20),
    marginLeft: horizontalScale(25),
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: scaleFontSize(18),
  },
  forgot: {
    color: '#497C79',
    marginTop: verticalScale(15),
    marginLeft: horizontalScale(25),
    fontSize: scaleFontSize(16),
  },
  SignUpButton: {
    flexDirection: 'row',
    marginTop: verticalScale(25),
  },
  signInDescription: {
    marginLeft: horizontalScale(25),
    fontSize: scaleFontSize(16),
  },
  signInPrompt: {
    color: '#497C79',
    fontWeight: '800',
    marginLeft: horizontalScale(10),
    fontSize: scaleFontSize(16),
  },
  errorMessage: {
    color: '#D41A1A',
    marginLeft: horizontalScale(25),
    marginTop: verticalScale(10),
    fontSize: scaleFontSize(16),
  },
  keepLoggedInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: horizontalScale(20),
    marginTop: verticalScale(10),
  },
});

export default styles;
