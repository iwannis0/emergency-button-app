import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import AlertsScreen from '../screens/AlertsScreen/AlertsScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {scaleFontSize} from '../assets/styles/scaling';
import MedicalHistoryScreen from '../screens/MedicalHistoryScreen/MedicalHistoryScreen';
import ServicesScreen from '../screens/ServicesScreen/ServicesScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import {useTranslation} from 'react-i18next';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import {t} from 'i18next';
import EpidemiologicalHistoryScreen from '../screens/MedicalHistoryScreen/Contents/EpidemiologicalHistory/EpidemiologicalHistoryScreen';
import AllergiesScreen from '../screens/MedicalHistoryScreen/Contents/MedicalPersonalHistory/screens/AllergiesScreen';
import ProblemsScreen from '../screens/MedicalHistoryScreen/Contents/MedicalPersonalHistory/screens/ProblemsScreen';
import DevicesScreen from '../screens/MedicalHistoryScreen/Contents/MedicalPersonalHistory/screens/DevicesScreen';
import MedicationSummaryScreen from '../screens/MedicalHistoryScreen/Contents/MedicalPersonalHistory/screens/MedicationSummaryScreen';

const ICON_SIZE = scaleFontSize(25);
const INACTIVE_COLOR = '#A4A4A4';
const ACTIVE_COLOR = '#33C3BB';

const stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const NonAuthenticated = () => {
  return (
    <stack.Navigator
      initialRouteName={Routes.LoginScreen}
      screenOptions={{
        header: () => null,
        headerShown: false,
      }}>
      <stack.Screen name={Routes.LoginScreen} component={LoginScreen} />
    </stack.Navigator>
  );
};

export const MyHealthStack = () => {
  const {t} = useTranslation();

  return (
    <stack.Navigator
      initialRouteName={Routes.Home}
      screenOptions={{
        headerShown: true,
        headerTransparent: true, // Set the background color to transparent
      }}>
      <stack.Screen
        name={Routes.Home}
        component={HomeScreen}
        options={{headerShown: true, headerTitle: t('Home')}}
      />
      <stack.Screen
        name={Routes.Alerts}
        component={AlertsScreen}
        options={{headerShown: true, headerTitle: t('Alerts')}}
      />
      <stack.Screen
        name={Routes.MedicalHistory}
        component={MedicalHistoryScreen}
        options={{headerShown: true, headerTitle: t('Medical History')}}
      />
      <stack.Screen
        name={Routes.EpidemiologicalHistoryScreen}
        component={EpidemiologicalHistoryScreen}
        options={{
          headerShown: true,
          headerTitle: t(
            'medicalHistory.epidemiologicalHistory.travel-history',
          ),
        }}
      />
      <stack.Screen
        name={Routes.AllergiesScreen}
        component={AllergiesScreen}
        options={{
          headerShown: true,
          headerTitle: t(
            'medicalHistory.medicalPersonalHistory.allergies.title',
          ),
        }}
      />
      <stack.Screen
        name={Routes.ProblemsScreen}
        component={ProblemsScreen}
        options={{
          headerShown: true,
          headerTitle: t(
            'medicalHistory.medicalPersonalHistory.problems.title',
          ),
        }}
      />
      <stack.Screen
        name={Routes.DevicesScreen}
        component={DevicesScreen}
        options={{
          headerShown: true,
          headerTitle: t('medicalHistory.medicalPersonalHistory.devices.title'),
        }}
      />
      <stack.Screen
        name={Routes.MedicationSummaryScreen}
        component={MedicationSummaryScreen}
        options={{
          headerShown: true,
          headerTitle: t(
            'medicalHistory.medicalPersonalHistory.medication.title',
          ),
        }}
      />
      <stack.Screen
        name={Routes.Profile}
        component={ProfileScreen}
        options={{headerShown: true, headerTitle: ''}}
      />
    </stack.Navigator>
  );
};

export const ServicesStack = () => {
  const {t} = useTranslation();
  return (
    <stack.Navigator
      initialRouteName={Routes.ServicesScreen}
      screenOptions={{
        headerShown: true,
        headerTransparent: true, // Set the background color to transparent
      }}>
      <stack.Screen
        name={Routes.ServicesScreen}
        component={ServicesScreen}
        options={{headerShown: true, headerTitle: t('Services')}}
      />
    </stack.Navigator>
  );
};

export const SettingsStack = () => {
  const {t} = useTranslation();
  return (
    <stack.Navigator
      initialRouteName={Routes.SettingsScreen}
      screenOptions={{
        headerShown: true,
        headerTransparent: true, // Set the background color to transparent
      }}>
      <stack.Screen
        name={Routes.SettingsScreen}
        component={SettingsScreen}
        options={{headerShown: true, headerTitle: t('Settings')}}
      />
    </stack.Navigator>
  );
};

export const Authenticated = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: ACTIVE_COLOR,
        activeTintColor: ACTIVE_COLOR, // Change the text color for focused tab
        tintColor: INACTIVE_COLOR,
        tabBarLabelStyle: {
          fontSize: scaleFontSize(16),
        },
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: t('MyHealth'),
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/forNavigation/myHealth.png')}
              style={{
                width: ICON_SIZE,
                height: ICON_SIZE,
                tintColor: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
              }}
            />
          ),
          headerShown: false,
        }}
        name="MyHealth"
        component={MyHealthStack}
      />
      <Tab.Screen
        options={{
          title: t('Services'),
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/forNavigation/Services.png')}
              style={{
                width: ICON_SIZE,
                height: ICON_SIZE,
                tintColor: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
              }}
            />
          ),
          headerShown: false,
        }}
        name="Services"
        component={ServicesStack}
      />
      <Tab.Screen
        options={{
          title: t('Settings'),
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/forNavigation/Settings.png')}
              style={{
                width: ICON_SIZE,
                height: ICON_SIZE,
                tintColor: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
              }}
            />
          ),
          headerShown: false,
        }}
        name="Settings"
        component={SettingsStack}
      />
    </Tab.Navigator>
  );
};
