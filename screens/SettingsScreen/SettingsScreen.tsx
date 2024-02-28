import React from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import i18n from '../../assets/translations/i18next';
import styles from './style';
import globalStyle from '../../assets/styles/globalStyle';
import NavigationButton from '../../components/NavigationButton/NavigationButton';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import {useRecoilState, useResetRecoilState} from 'recoil';
import {userState} from '../../features/recoil/atoms/User/userState';
import {UserPreferencesState} from '../../features/recoil/atoms/UserPreferences/UserPreferencesState';
import {signOut} from '../../features/auth/auth';

const SettingsScreen = () => {
  const {t} = useTranslation();
  const [_, setUserPreferences] = useRecoilState(UserPreferencesState);
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
  }

  return (
    <SafeAreaView style={styles.container}>
      <View />
      <ScrollView style={globalStyle.marginTop60}>
        {/* Change Language */}
        <ModalComponent
          title={t('general.language')}
          visibility={LanguageModalVisible}
          onClose={() => setLanguageModalVisible(false)}>
          <ScrollView>
            <NavigationButton
              type={'withIcon'}
              image={require('../../assets/images/Languages/english.png')}
              title={t('general.english')}
              onPress={() => {
                i18n.changeLanguage('en');
                setUserPreferences(currentUserPreferences => ({
                  ...currentUserPreferences,
                  language: 'English',
                }));
                setLanguageModalVisible(false);
              }}
              bottomBorderStyle={globalStyle.bottomBorderL3}
              titleStyle={globalStyle.descriptionBlackL1}
            />
            <NavigationButton
              type={'withIcon'}
              image={require('../../assets/images/Languages/greek.png')}
              title={t('general.greek')}
              onPress={() => {
                i18n.changeLanguage('gr');
                setUserPreferences(currentUserPreferences => ({
                  ...currentUserPreferences,
                  language: 'Greek',
                }));
                setLanguageModalVisible(false);
              }}
              titleStyle={globalStyle.descriptionBlackL1}
            />
          </ScrollView>
        </ModalComponent>

        <NavigationButton
          type={'withArrow'}
          title={t('general.language')}
          onPress={() => {
            setLanguageModalVisible(true);
          }}
          bottomBorderStyle={globalStyle.bottomBorderL3}
          titleStyle={globalStyle.descriptionBlackL1}
        />

        {/* Terms of use */}
        <ModalComponent
          title={t('settings.terms')}
          visibility={TermsModalVisible}
          onClose={() => setTermsModalVisible(false)}>
          <ScrollView>
            <Text style={styles.modalInformation}>
              {t('settings.terms-description')}
            </Text>
          </ScrollView>
        </ModalComponent>

        <NavigationButton
          type={'withArrow'}
          title={t('settings.terms')}
          onPress={() => {
            setTermsModalVisible(true);
          }}
          bottomBorderStyle={globalStyle.bottomBorderL3}
          titleStyle={globalStyle.descriptionBlackL1}
        />

        {/* Privacy Policy */}
        <ModalComponent
          title={t('settings.privacy-policy')}
          visibility={PrivacyModalVisible}
          onClose={() => setPrivacyModalVisible(false)}>
          <ScrollView>
            <Text style={styles.modalInformation}>
              {t('settings.privacy-policy-description')}
            </Text>
          </ScrollView>
        </ModalComponent>

        <NavigationButton
          type={'withArrow'}
          title={t('settings.privacy-policy')}
          onPress={() => {
            setPrivacyModalVisible(true);
          }}
          bottomBorderStyle={globalStyle.bottomBorderL3}
          titleStyle={globalStyle.descriptionBlackL1}
        />

        {/* About */}
        <ModalComponent
          title={t('dictionary.about')}
          visibility={AboutModalVisible}
          onClose={() => setAboutModalVisible(false)}>
          <ScrollView>
            <Text style={styles.modalInformation}>
              {t('settings.about-description')}
            </Text>
          </ScrollView>
        </ModalComponent>

        <NavigationButton
          type={'withArrow'}
          title={t('dictionary.about')}
          onPress={() => {
            setAboutModalVisible(true);
          }}
          bottomBorderStyle={globalStyle.bottomBorderL3}
          titleStyle={globalStyle.descriptionBlackL1}
        />

        {/* Logout */}
        <NavigationButton
          type={'withArrow'}
          title={t('settings.logout')}
          onPress={() => {
            handleLogout();
          }}
          titleStyle={globalStyle.descriptionBlackL1}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
