import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import globalStyle from '../../../../../assets/styles/globalStyle';
import alcoholConsumption from '../AlcoholConsumption';
import {verticalScale} from '../../../../../assets/styles/scaling';
import tobbacoUse from '../TobbacoUse';
import drugUse from '../DrugUse';

const SocialHistoryScreen = () => {
  const {t} = useTranslation();
  const SocialHistoryTabs = createMaterialTopTabNavigator();

  return (
    <SafeAreaView>
      <View>
        <View style={globalStyle.marginTop60}>
          <View style={styles.container}>
            <SocialHistoryTabs.Navigator
              screenOptions={{
                tabBarLabelStyle: [
                  globalStyle.descriptionGrey,
                  {textTransform: 'none'},
                ],
                tabBarStyle: {backgroundColor: '#f2f2f2'},
                tabBarIndicatorStyle: {backgroundColor: 'transparent'},
                tabBarItemStyle: {width: verticalScale(190)},
                tabBarScrollEnabled: true,
              }}>
              <SocialHistoryTabs.Screen
                name={t(
                  'medicalHistory.socialHistory.alcohol-consumption.title',
                )}
                component={alcoholConsumption}
              />
              <SocialHistoryTabs.Screen
                name={t('medicalHistory.socialHistory.tobacco-use.title')}
                component={tobbacoUse}
              />
              <SocialHistoryTabs.Screen
                name={t('medicalHistory.socialHistory.drug-use.title')}
                component={drugUse}
              />
            </SocialHistoryTabs.Navigator>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SocialHistoryScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
