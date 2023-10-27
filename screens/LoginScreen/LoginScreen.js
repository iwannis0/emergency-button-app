import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from 'react-native';
import globalStyle from '../../assets/styles/globalStyle';
import styles from './style';
import {useTranslation} from 'react-i18next';
import Loading from '../../components/Loading/Loading';
import i18n from '../../assets/translations/i18next';
import {signIn} from '../../features/auth/auth';
import {useRecoilState} from 'recoil';
import {userState, User} from '../../features/recoil/atoms/User/userState';

const LoginScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [user, setUser] = useRecoilState(userState);

  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [incorrectPwd, setincorrectPwd] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    const signingRepsonse = await signIn(username, password);

    if (signingRepsonse.status === 'Authorized') {
      setLoading(false);
      setUser(signingRepsonse.data);
    } else {
      setLoading(false);
      setincorrectPwd(true);
    }
  }

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
