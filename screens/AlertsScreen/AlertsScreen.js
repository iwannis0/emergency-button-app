import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import InformationCard from '../../components/InformationCard/InformationCard';
import globalStyle from '../../assets/styles/globalStyle';
import ExpandableView from '../../components/ExpandableView/ExpandableView';
import {ScrollView} from 'react-native-gesture-handler';

const AlertsScreen = () => {
  return (
    <View style={styles.background}>
      <View style={globalStyle.marginTop60}>
        <View
          style={[
            globalStyle.backgroundWhite,
            globalStyle.informationCardContainer,
          ]}>
          <InformationCard
            type="Allergy"
            title="Dust (substance)"
            TopSubtitle="Environment"
            BottomSubtitle="Allergic dispotition"
            risk="High Risk"
            status="Active"
            onset="23/06/23"
          />
          <InformationCard
            modaltext={'This is a modal 2'}
            type="Medical"
            title="Cholera"
            TopSubtitle="Environment"
            BottomSubtitle="36"
            risk="Moderate"
            status="Active"
            onset="23/06/23"
          />
          <InformationCard
            type="Medical"
            title="Eczema herpeticum"
            BottomSubtitle="36"
            risk="Mild"
            onset="23/06/23"
          />
          <InformationCard
            type="Procedure"
            title="Cardioversion"
            TopSubtitle="12nm mpla mpla adffasfad adsfadsfadsf dfafasd"
            BottomSubtitle="36"
          />
        </View>
      </View>
      <ScrollView>
        <ExpandableView title="Epidemiological History" />
        <ExpandableView title="Medical Personal History" />
        <ExpandableView title="Plan of Care" />
      </ScrollView>
    </View>
  );
};

export default AlertsScreen;
