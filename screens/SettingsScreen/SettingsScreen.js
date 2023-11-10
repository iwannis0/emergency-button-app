// Basics
import React from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';

// Styles
import styles from './style';
import globalStyle from '../../assets/styles/globalStyle';

// Components
import NavigationButton from '../../components/NavigationButton/NavigationButton';
import ModalComponent from '../../components/ModalComponent/ModalComponent';

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

  const [TermsModalVisible, setTermsModalVisible] = React.useState(false);
  const [PrivacyModalVisible, setPrivacyModalVisible] = React.useState(false);
  const [AboutModalVisible, setAboutModalVisible] = React.useState(false);

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
        {/* Change Language */}
        <NavigationButton
          type={'withArrow'}
          title={t('Language')}
          onPress={() => {
            navigation.navigate('Alerts'); // TO BE IMPLEMENTED
          }}
        />

        {/* Terms of use */}
        <ModalComponent
          title={t('Terms of Use')}
          visibility={TermsModalVisible}
          onClose={() => setTermsModalVisible(false)}>
          <ScrollView>
            <Text style={styles.modalInformation}>
              {t('terms-conditions-text')}
            </Text>
          </ScrollView>
        </ModalComponent>

        <NavigationButton
          type={'withArrow'}
          title={t('Terms of Use')}
          onPress={() => {
            setTermsModalVisible(true);
          }}
        />

        {/* Privacy Policy */}
        <ModalComponent
          title={t('Privacy Policy')}
          visibility={PrivacyModalVisible}
          onClose={() => setPrivacyModalVisible(false)}>
          <ScrollView>
            <Text style={styles.modalInformation}>
              {t('privacy-policy-text')}
            </Text>
          </ScrollView>
        </ModalComponent>

        <NavigationButton
          type={'withArrow'}
          title={t('Privacy Policy')}
          onPress={() => {
            setPrivacyModalVisible(true);
          }}
        />

        {/* About */}
        <ModalComponent
          title={t('About')}
          visibility={AboutModalVisible}
          onClose={() => setAboutModalVisible(false)}>
          <ScrollView>
            <Text style={styles.modalInformation}>{t('about-text')}</Text>
          </ScrollView>
        </ModalComponent>

        <NavigationButton
          type={'withArrow'}
          title={t('About')}
          onPress={() => {
            setAboutModalVisible(true);
          }}
        />

        {/* Logout */}
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
