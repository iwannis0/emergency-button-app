import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import globalStyle from '../../../../assets/styles/globalStyle';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {scaleFontSize} from '../../../../assets/styles/scaling';
import PregnancyHistory from './PregnancyHistory';
import PregnancyOutcome from './PregnancyOutcome';

const GynecologicalHistoryScreen = () => {
  const {t} = useTranslation();
  const ProblemsTabs = createMaterialTopTabNavigator();

  return (
    <SafeAreaView>
      <View>
        <View style={globalStyle.marginTop60}>
          <View style={styles.container}>
            <ProblemsTabs.Navigator
              screenOptions={{
                tabBarLabelStyle: [
                  globalStyle.descriptionGrey,
                  {textTransform: 'none', fontSize: scaleFontSize(16)},
                ],
                tabBarStyle: {backgroundColor: '#f2f2f2'},
                tabBarIndicatorStyle: {backgroundColor: '#33C3BB'},
              }}>
              <ProblemsTabs.Screen
                name={t('medicalHistory.gynecological.pregnancy-outcome.title')}
                component={PregnancyOutcome}
              />
              <ProblemsTabs.Screen
                name={t('medicalHistory.gynecological.pregnancy-history.title')}
                component={PregnancyHistory}
              />
            </ProblemsTabs.Navigator>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GynecologicalHistoryScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
