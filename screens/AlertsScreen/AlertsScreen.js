import React from 'react';
import {View, ScrollView, SafeAreaView} from 'react-native';
import styles from './style';
import InformationCard from '../../components/InformationCard/InformationCard';
import Subtitle from '../../components/Subtitle/Subtitle';
import globalStyle from '../../assets/styles/globalStyle';

const AlertsScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.background}>
          <View style={globalStyle.marginTop60}>
            <Subtitle title="Allergies" />
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
            </View>
            {/*******************************************************/}
            <Subtitle
              title="Major Medical Problems"
              style={globalStyle.subtitleBox}
            />
            <View
              style={[
                globalStyle.backgroundWhite,
                globalStyle.informationCardContainer,
              ]}>
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
            </View>
            {/*******************************************************/}
            <Subtitle title="Procedures" style={globalStyle.subtitleBox} />
            <View
              style={[
                globalStyle.backgroundWhite,
                globalStyle.informationCardContainer,
              ]}>
              <InformationCard
                type="Procedure"
                title="Cardioversion"
                TopSubtitle="12nm mpla mpla adffasfad adsfadsfadsf dfafasd"
                BottomSubtitle="36"
              />
            </View>
            {/*******************************************************/}
            <Subtitle title="Medical Devices" style={globalStyle.subtitleBox} />
            <View
              style={[
                globalStyle.backgroundWhite,
                globalStyle.informationCardContainer,
              ]}>
              <InformationCard
                type="Device"
                title="Arterial stent (physical object)"
                TopSubtitle="Onset Date:"
                BottomSubtitle="Removal Date:"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AlertsScreen;
