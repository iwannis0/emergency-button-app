import {StyleSheet} from 'react-native';
import {horizontalScale} from '../../assets/styles/scaling';

const myHealthDashboardStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  modalInformation: {
    marginLeft: horizontalScale(21),
    marginRight: horizontalScale(30),
  },
});

export default myHealthDashboardStyle;
