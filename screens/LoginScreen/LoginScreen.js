import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Alert,
  ScrollView,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import i18n from '../../assets/translations/i18next';
import styles from './style';
import globalStyle from '../../assets/styles/globalStyle';
import Loading from '../../components/Loading/Loading';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import NavigationButton from '../../components/NavigationButton/NavigationButton';

const AUTHORIZED = 'Authorized';
const SUCCESS = 'Success';

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

const LoginScreen = ({navigation}) => {
  const {t} = useTranslation();
  const isFocused = useIsFocused();

  const [user, setUser] = useRecoilState(userState);
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

  const images = {
    English: require('../../assets/images/Languages/english.png'),
    Greek: require('../../assets/images/Languages/greek.png'),
  };

  useEffect(() => {
    async function checkBiometricsAndRefresh() {
      if (isFocused && userPreferences.keepLoggedIn) {
        const biometricAuth = await checkBiometrics(t('Instruction'));
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
        if (userPreferences.language === 'English') {
          i18n.changeLanguage('en');
        } else {
          i18n.changeLanguage('gr');
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
      Alert.alert(t('login-alert-title'), t('login-alert-description'), [
        {text: t('login-alert-continue')},
      ]);
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
            bottomBorderStyle={globalStyle.bottomBorderL3}
            titleStyle={globalStyle.descriptionBlackL1}
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
            titleStyle={globalStyle.descriptionBlackL1}
          />
        </ScrollView>
      </ModalComponent>

      <TouchableOpacity
        style={styles.changeLanguageContainer}
        onPress={() => {
          setLanguageModalVisible(true);
        }}>
        <Text style={globalStyle.descriptionBlackL3}>
          {t('change-language')}
        </Text>
        <Image
          style={styles.changeLanguageImage}
          source={images[userPreferences.language]}
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
          {t('Login')}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={t('Username')}
          onChangeText={text => setUsername(text)}
        />
        <View style={styles.PasswordContainer}>
          <TextInput
            style={styles.input}
            placeholder={t('Password')}
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
            {t('Incorrect username or password')}
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
            {t('keep-me-logged-in')}
          </Text>
        </TouchableOpacity>

        {/* Sign In Button */}
        <TouchableOpacity
          style={[globalStyle.Button, globalStyle.fullyCentered]}
          onPress={() => {
            setLoading(true);
            handleLogin();
          }}>
          <Text style={globalStyle.buttonText}>{t('Sign In')}</Text>
        </TouchableOpacity>

        {/* Forgot Password Button */}
        <TouchableOpacity>
          <Text style={[globalStyle.descriptionBlack, styles.forgot]}>
            {t('Forgot your Password?')}
          </Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.SignUpButton}>
          <Text
            style={[globalStyle.descriptionBlack, styles.signInDescription]}>
            {t("Don't have an account?")}
          </Text>
          <Text style={[globalStyle.descriptionBlack, styles.signInPrompt]}>
            {t('Join now')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Loading Animation */}
      {loading && <Loading />}
    </SafeAreaView>
  );
};

export default LoginScreen;
