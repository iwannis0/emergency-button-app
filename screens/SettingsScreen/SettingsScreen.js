import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import NavigationButton from '../../components/NavigationButton/NavigationButton';
import styles from './style';
import globalStyle from '../../assets/styles/globalStyle';
import {useTranslation} from 'react-i18next';
import {useResetRecoilState, useSetRecoilState} from 'recoil';
import {userState} from '../../features/recoil/atoms/User/userState';
import {signOut} from '../../features/auth/auth';
import {keepLoggedInSelector} from '../../features/recoil/selectors/UserPreferencesSelectors';

const SettingsScreen = ({navigation}) => {
  const {t} = useTranslation();
  const resetUser = useResetRecoilState(userState);
  const setKeepLoggedIn = useSetRecoilState(keepLoggedInSelector);

  async function handleLogout() {
    const logoutResponse = await signOut(true);
    if (logoutResponse === 'Success') {
      setKeepLoggedIn(false);
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
