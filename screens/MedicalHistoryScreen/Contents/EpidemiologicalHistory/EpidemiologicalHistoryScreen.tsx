import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import globalStyle from '../../../../assets/styles/globalStyle';
import TravelHistory from './TravelHistory';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {verticalScale} from '../../../../assets/styles/scaling';

const EpidemiologicalHistoryScreen = () => {
  const {t} = useTranslation();
  const TravelHistoryTabs = createMaterialTopTabNavigator();

  return (
    <SafeAreaView>
      <View>
        <View style={globalStyle.marginTop60}>
          <View style={styles.container}>
            <TravelHistoryTabs.Navigator
              screenOptions={{
                tabBarLabelStyle: [
                  globalStyle.descriptionGrey,
                  {textTransform: 'none'},
                ],
                tabBarStyle: {backgroundColor: '#f2f2f2'},
                tabBarIndicatorStyle: {backgroundColor: 'transparent'},
                tabBarItemStyle: {width: verticalScale(140)},
              }}>
              <TravelHistoryTabs.Screen
                name={t('medicalHistory.epidemiologicalHistory.travel-history')}
                component={TravelHistory}
              />
            </TravelHistoryTabs.Navigator>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EpidemiologicalHistoryScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
