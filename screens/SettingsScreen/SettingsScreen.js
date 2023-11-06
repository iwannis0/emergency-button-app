// Basics
import React from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, ScrollView, View} from 'react-native';

// Styles
import styles from './style';
import globalStyle from '../../assets/styles/globalStyle';

// Components
import NavigationButton from '../../components/NavigationButton/NavigationButton';

// Values
import {useRecoilState, useResetRecoilState} from 'recoil';
import {userState} from '../../features/recoil/atoms/User/userState';
import {UserPreferencesState} from '../../features/recoil/atoms/UserPreferences/UserPreferencesState';

// Functions
import {signOut} from '../../features/auth/auth';

const SettingsScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [userPreferences, setUserPreferences] =
    useRecoilState(UserPreferencesState);
  const resetUser = useResetRecoilState(userState);

  async function handleLogout() {
    const logoutResponse = await signOut(true);
    if (logoutResponse === 'Success') {
      setUserPreferences(currentUserPreferences => ({
        ...currentUserPreferences,
        keepLoggedIn: false,
      }));
      resetUser();
    }
    return;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ImageContainer} />
      <ScrollView style={globalStyle.marginTop60}>
        <NavigationButton
          type={'withArrow'}
          title={t('Language')}
          onPress={() => {
            navigation.navigate('Alerts'); // TO BE IMPLEMENTED
          }}
        />
        <NavigationButton
          type={'withArrow'}
          title={t('Terms of Use')}
          onPress={() => {
            navigation.navigate('Alerts'); // TO BE IMPLEMENTED
          }}
        />
        <NavigationButton
          type={'withArrow'}
          title={t('Privacy Policy')}
          onPress={() => {
            navigation.navigate('Alerts'); // TO BE IMPLEMENTED
          }}
        />
        <NavigationButton
          type={'withArrow'}
          title={t('About')}
          onPress={() => {
            navigation.navigate('Alerts'); // TO BE IMPLEMENTED
          }}
        />
        <NavigationButton
          type={'withArrow'}
          title={t('Logout')}
          onPress={() => {
            handleLogout();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
