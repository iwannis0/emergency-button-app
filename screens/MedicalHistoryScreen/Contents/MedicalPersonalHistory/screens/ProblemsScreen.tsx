import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import globalStyle from '../../../../../assets/styles/globalStyle';
import CurrentProblems from '../CurrentProblems';
import ResolvedProblems from '../ResolvedProblems';
import Procedures from '../Procedures';
import FunctionalStatus from '../FunctionalStatus';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const ProblemsScreen = () => {
  const {t} = useTranslation();
  const AllergiesTabs = createMaterialTopTabNavigator();

  return (
    <SafeAreaView>
      <View>
        <View style={globalStyle.marginTop60}>
          <View style={styles.container}>
            <AllergiesTabs.Navigator
              screenOptions={{
                tabBarLabelStyle: [
                  globalStyle.descriptionGrey,
                  {textTransform: 'none'},
                ],
                tabBarStyle: {backgroundColor: '#f2f2f2'},
                tabBarIndicatorStyle: {backgroundColor: 'transparent'},
              }}>
              <AllergiesTabs.Screen
                name={t(
                  'medicalHistory.medicalPersonalHistory.problems.current.title',
                )}
                component={CurrentProblems}
              />
              <AllergiesTabs.Screen
                name={t(
                  'medicalHistory.medicalPersonalHistory.problems.resolved.title',
                )}
                component={ResolvedProblems}
              />
              {/* <AllergiesTabs.Screen
                name={t(
                  'medicalHistory.medicalPersonalHistory.problems.procedures.title',
                )}
                component={Procedures}
              />
              <AllergiesTabs.Screen
                name={t(
                  'medicalHistory.medicalPersonalHistory.problems.functional.title',
                )}
                component={FunctionalStatus}
              /> */}
            </AllergiesTabs.Navigator>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProblemsScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
