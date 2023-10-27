import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import NavigationButton from '../../components/NavigationButton/NavigationButton';
import styles from './style';
import globalStyle from '../../assets/styles/globalStyle';
import {useTranslation} from 'react-i18next';
import {useResetRecoilState} from 'recoil';
import {userState} from '../../features/recoil/atoms/User/userState';

const SettingsScreen = ({navigation}) => {
  const {t} = useTranslation();
  const resetUser = useResetRecoilState(userState);

  async function handleLogout() {
    resetUser();
    return;
    // const signingRepsonse = await signIn(username, password);

    // if (signingRepsonse.status) {
    //   setLoading(false);
    //   setUser(signingRepsonse.data);
    // } else {
    //   setLoading(false);
    //   setincorrectPwd(true);
    // }
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
