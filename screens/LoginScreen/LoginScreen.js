import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Switch,
  Alert,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import i18n from '../../assets/translations/i18next';
import styles from './style';
import globalStyle from '../../assets/styles/globalStyle';
import Loading from '../../components/Loading/Loading';

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
      <View style={[styles.ImageContainer, globalStyle.fullyCentered]}>
        <Image source={require('../../assets/images/Login/logo.png')} />
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
          style={[styles.Button, globalStyle.fullyCentered]}
          onPress={() => {
            setLoading(true);
            handleLogin();
          }}>
          <Text style={styles.buttonText}>{t('Sign In')}</Text>
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

      <Button
        title={'Testing Language'}
        onPress={() => {
          i18n.changeLanguage('gr');
        }}
      />
      {/* Loading Animation */}
      {loading && <Loading />}
    </SafeAreaView>
  );
};

export default LoginScreen;
