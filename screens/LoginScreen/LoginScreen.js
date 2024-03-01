import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import i18n from '../../assets/translations/i18next';
import styles from './style';
import globalStyle from '../../assets/styles/globalStyle';
import Loading from '../../components/Loading/Loading';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import NavigationButton from '../../components/NavigationButton/NavigationButton';
// Values
import {useRecoilState} from 'recoil';
import {userState} from '../../features/recoil/atoms/User/userState';
import {UserPreferencesState} from '../../features/recoil/atoms/UserPreferences/UserPreferencesState';

// Functions
import {autoLogin, signIn} from '../../features/auth/auth';
import {useIsFocused} from '@react-navigation/native';
import {
  checkBiometrics,
  isPhoneSecuredCheck,
} from '../../features/auth/BiometricsManager';
import CountryFlag from 'react-native-country-flag';
import {LANGUAGE_ISO_CODE} from '../../common/constants/constants';

const AUTHORIZED = 'Authorized';
const SUCCESS = 'Success';

const LoginScreen = () => {
  const {t} = useTranslation();
  const isFocused = useIsFocused();

  const [_, setUser] = useRecoilState(userState);
  const [userPreferences, setUserPreferences] =
    useRecoilState(UserPreferencesState);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [incorrectPwd, setIncorrectPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [keepLoggedInSwitch, setKeepLoggedInSwitch] = useState(false);
  const [isPhoneSecured, setIsPhoneSecured] = useState(true);
  const [LanguageModalVisible, setLanguageModalVisible] = React.useState(false);

  useEffect(() => {
    async function checkBiometricsAndRefresh() {
      if (isFocused && userPreferences.keepLoggedIn) {
        const biometricAuth = await checkBiometrics(
          t('login.biometrics-instruction'),
        );
        if (biometricAuth.status === SUCCESS) {
          setLoading(true);
          const signingResponse = await autoLogin();
          if (signingResponse.status === AUTHORIZED) {
            setLoading(false);
            setUser(signingResponse.data);
          }
        }
      } else {
        setIsPhoneSecured(await isPhoneSecuredCheck());
      }
    }
    checkBiometricsAndRefresh();
  }, [isFocused, userPreferences, setUser, t]);

  useEffect(() => {
    async function checkLanguage() {
      if (isFocused) {
        switch (userPreferences.language) {
          case 'Greek':
            await i18n.changeLanguage('gr');
            break;
          case 'Portuguese':
            await i18n.changeLanguage('pt');
            break;
          case 'Hungarian':
            await i18n.changeLanguage('hu');
            break;
          case 'Slovak':
            await i18n.changeLanguage('si');
            break;
          case 'Czech':
            await i18n.changeLanguage('cz');
            break;
          default:
            await i18n.changeLanguage('gb');
            break;
        }
      }
    }

    checkLanguage();
  }, [isFocused, userPreferences]);

  async function handleLogin() {
    const signingRepsonse = await signIn(
      username,
      password,
      keepLoggedInSwitch,
    );
    if (signingRepsonse.status === AUTHORIZED) {
      setLoading(false);
      setUser(signingRepsonse.data);
      setUserPreferences(currentUserPreferences => ({
        ...currentUserPreferences,
        keepLoggedIn: keepLoggedInSwitch,
      }));
    } else {
      setLoading(false);
      setIncorrectPassword(true);
    }
  }

  const SwitchAlert = () => {
    if (!isPhoneSecured) {
      Alert.alert(
        t('login.alert-disabled-logged'),
        t('login.alert-disabled-description'),
        [{text: t('general.continue')}],
      );
    }
  };

  return (
    <SafeAreaView style={[{flex: 1, backgroundColor: '#E0EDF2'}]}>
      <ModalComponent
        title={t('Language')}
        visibility={LanguageModalVisible}
        onClose={() => setLanguageModalVisible(false)}>
        <ScrollView>
          <NavigationButton
            type={'withIcon'}
            countryIso={'gb'}
            title={'English'}
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
            countryIso={'gr'}
            title={t('Ελληνικά')}
            onPress={() => {
              i18n.changeLanguage('gr');
              setUserPreferences(currentUserPreferences => ({
                ...currentUserPreferences,
                language: 'Greek',
              }));
              setLanguageModalVisible(false);
            }}
            bottomBorderStyle={globalStyle.bottomBorderL3}
            titleStyle={globalStyle.descriptionBlackL1}
          />
          <NavigationButton
            type={'withIcon'}
            countryIso={'pt'}
            title={'Português'}
            onPress={() => {
              i18n.changeLanguage('pt');
              setUserPreferences(currentUserPreferences => ({
                ...currentUserPreferences,
                language: 'Portuguese',
              }));
              setLanguageModalVisible(false);
            }}
            bottomBorderStyle={globalStyle.bottomBorderL3}
            titleStyle={globalStyle.descriptionBlackL1}
          />
          <NavigationButton
            type={'withIcon'}
            countryIso={'hu'}
            title={'Magyar'}
            onPress={() => {
              i18n.changeLanguage('hu');
              setUserPreferences(currentUserPreferences => ({
                ...currentUserPreferences,
                language: 'Hungarian',
              }));
              setLanguageModalVisible(false);
            }}
            bottomBorderStyle={globalStyle.bottomBorderL3}
            titleStyle={globalStyle.descriptionBlackL1}
          />
          <NavigationButton
            type={'withIcon'}
            countryIso={'si'}
            title={'Slovenský'}
            onPress={() => {
              i18n.changeLanguage('si');
              setUserPreferences(currentUserPreferences => ({
                ...currentUserPreferences,
                language: 'Slovak',
              }));
              setLanguageModalVisible(false);
            }}
            bottomBorderStyle={globalStyle.bottomBorderL3}
            titleStyle={globalStyle.descriptionBlackL1}
          />
          <NavigationButton
            type={'withIcon'}
            countryIso={'cz'}
            title={'Čeština'}
            onPress={() => {
              i18n.changeLanguage('cz');
              setUserPreferences(currentUserPreferences => ({
                ...currentUserPreferences,
                language: 'Czech',
              }));
              setLanguageModalVisible(false);
            }}
            titleStyle={globalStyle.descriptionBlackL1}
          />
        </ScrollView>
      </ModalComponent>

      <TouchableOpacity
        style={styles.changeLanguageContainer}
        onPress={() => {
          setLanguageModalVisible(true);
        }}>
        <Text style={globalStyle.descriptionBlackL2}>
          {t('general.change-language')}:{' '}
        </Text>
        <CountryFlag
          isoCode={LANGUAGE_ISO_CODE[userPreferences.language]}
          size={25}
        />
      </TouchableOpacity>
      <View style={[styles.ImageContainer, globalStyle.fullyCentered]}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/Login/logo.png')}
        />
      </View>
      <View
        style={[styles.LoginContainer, globalStyle.backgroundWhite, {flex: 1}]}>
        <Text style={[globalStyle.descriptionBlack, styles.login]}>
          {t('login.title')}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={t('login.username')}
          onChangeText={text => setUsername(text)}
        />
        <View style={styles.PasswordContainer}>
          <TextInput
            style={styles.input}
            placeholder={t('login.password')}
            secureTextEntry={!passwordVisible}
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity
            style={styles.passwordIcon}
            onPress={() => {
              setPasswordVisible(!passwordVisible);
            }}>
            <Image
              source={
                !passwordVisible
                  ? require('../../assets/images/Login/eye.png')
                  : require('../../assets/images/Login/closed_eye.png')
              }
            />
          </TouchableOpacity>
        </View>
        {incorrectPwd && (
          <Text style={[globalStyle.descriptionBlack, styles.errorMessage]}>
            {t('login.incorrect')}
          </Text>
        )}

        <TouchableOpacity
          style={styles.keepLoggedInContainer}
          onPress={SwitchAlert}>
          <Switch
            disabled={!isPhoneSecured}
            trackColor={{true: '497C79'}}
            thumbColor={keepLoggedInSwitch ? '#497C79' : '#f4f3f4'}
            onValueChange={() => setKeepLoggedInSwitch(!keepLoggedInSwitch)}
            value={keepLoggedInSwitch}
          />
          <Text style={[globalStyle.descriptionBlack]}>
            {t('login.keep-logged')}
          </Text>
        </TouchableOpacity>

        {/* Sign In Button */}
        <View style={globalStyle.fullyCentered}>
          <TouchableOpacity
            style={[globalStyle.Button]}
            onPress={() => {
              setLoading(true);
              handleLogin();
            }}>
            <Text style={globalStyle.buttonText}>{t('login.sign')}</Text>
          </TouchableOpacity>
        </View>

        {/* Forgot Password Button */}
        <TouchableOpacity>
          <Text style={[globalStyle.descriptionBlack, styles.forgot]}>
            {t('login.forgot')}
          </Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.SignUpButton}>
          <Text
            style={[globalStyle.descriptionBlack, styles.signInDescription]}>
            {t('login.new-account')}
          </Text>
          <Text style={[globalStyle.descriptionBlack, styles.signInPrompt]}>
            {t('login.join')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Loading Animation */}
      {loading && <Loading />}
    </SafeAreaView>
  );
};

export default LoginScreen;
