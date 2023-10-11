import React from 'react';
import {Text, View} from 'react-native';
import ExpandableView from '../../components/ExpandableView/ExpandableView';
import styles from '../AlertsScreen/style';
import globalStyle from '../../assets/styles/globalStyle';

const MedicalHistoryScreen = () => {
  return (
    <View style={styles.background}>
      <View style={globalStyle.marginTop60}>
        <ExpandableView title={'Epidimiological History'} />
        <ExpandableView title={'Medical Personal History'} />
        <ExpandableView title={'Gynecological History'} />
        <ExpandableView title={'Social History'} />
        <ExpandableView title={'Immunization'} />
        <ExpandableView title={'Plan of Care'} />
      </View>
    </View>
  );
};

export default MedicalHistoryScreen;
