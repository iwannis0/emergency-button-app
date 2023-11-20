import React from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';
import i18n from '../../assets/translations/i18next';
import styles from './style';
import globalStyle from '../../assets/styles/globalStyle';
import NavigationButton from '../../components/NavigationButton/NavigationButton';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import {useRecoilState, useResetRecoilState} from 'recoil';
import {userState} from '../../features/recoil/atoms/User/userState';
import {UserPreferencesState} from '../../features/recoil/atoms/UserPreferences/UserPreferencesState';
import {signOut} from '../../features/auth/auth';

const SettingsScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [userPreferences, setUserPreferences] =
    useRecoilState(UserPreferencesState);
  const resetUser = useResetRecoilState(userState);

  const [LanguageModalVisible, setLanguageModalVisible] = React.useState(false);
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
        <ModalComponent
          title={t('Language')}
          visibility={LanguageModalVisible}
          onClose={() => setLanguageModalVisible(false)}>
          <ScrollView>
            <NavigationButton
              type={'withIcon'}
              image={require('../../assets/images/Languages/english.png')}
              title={t('English')}
              onPress={() => {
                i18n.changeLanguage('en');
                setUserPreferences(currentUserPreferences => ({
                  ...currentUserPreferences,
                  language: 'English',
                }));
                setLanguageModalVisible(false);
              }}
            />
            <NavigationButton
              type={'withIcon'}
              image={require('../../assets/images/Languages/greek.png')}
              title={t('Greek')}
              onPress={() => {
                i18n.changeLanguage('gr');
                setUserPreferences(currentUserPreferences => ({
                  ...currentUserPreferences,
                  language: 'Greek',
                }));
                setLanguageModalVisible(false);
              }}
            />
          </ScrollView>
        </ModalComponent>

        <NavigationButton
          type={'withArrow'}
          title={t('Language')}
          onPress={() => {
            setLanguageModalVisible(true);
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
