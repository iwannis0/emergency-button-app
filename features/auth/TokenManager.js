const TOKEN_REFRESH_INTERVAL = 5000; // five minutes
const TOKEN_REFRESH_THRESHOLD = 20;
const LOGOUT = 'Logout';
const AUTHENTICATION = 'Authentication';
import {TokensUtils, TokenStorage} from 'react-native-keycloak-plugin';
import {RefreshToken} from '../../features/auth/auth';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {tokenSelector} from '../../features/recoil/selectors/userSelectors';
import {keepLoggedInSelector} from '../../features/recoil/selectors/UserPreferencesSelectors';
import {useEffect} from 'react';
import {Alert} from 'react-native';
import {useResetRecoilState} from 'recoil';
import {userState} from '../../features/recoil/atoms/User/userState';
import {signOut} from '../../features/auth/auth';
import {useState, useCallback} from 'react';
import {useTranslation} from 'react-i18next';

async function handleLogout(resetUser, resetKeychain) {
  const logoutResponse = await signOut(resetKeychain);
  if (logoutResponse === 'Success') {
    resetUser();
  }
  return;
}

async function refreshableFetch(keepLoggedIn, token) {
  if (token === '') {
    return 'Logged Out';
  }
  try {
    const expiredToken = await TokensUtils.isAccessTokenExpired();
    const expiringTokenSoon = await TokensUtils.willAccessTokenExpireInLessThan(
      TOKEN_REFRESH_THRESHOLD,
    );
    return !expiredToken || expiringTokenSoon
      ? await RefreshToken(keepLoggedIn)
      : 'All good';
  } catch (error) {
    return keepLoggedIn ? await RefreshToken(keepLoggedIn) : 'Logged Out';
  }
}

const TokenManager = () => {
  const {t} = useTranslation();
  const token = useRecoilValue(tokenSelector);
  const setToken = useSetRecoilState(tokenSelector);
  const keepLoggedIn = useRecoilValue(keepLoggedInSelector);
  const resetUser = useResetRecoilState(userState);
  const [isPaused, setIsPaused] = useState(false);

  const showAlert = useCallback(
    alertType => {
      let description = '';
      let resetKeycloak = true;
      if (alertType === LOGOUT) {
        description = t('alert-description');
      } else if (alertType === AUTHENTICATION) {
        description = t('authentication-description');
        resetKeycloak = false;
      }
      Alert.alert(t('alert-title'), description, [
        {
          text: t('alert-continue'),
          onPress: () => {
            handleLogout(resetUser, resetKeycloak);
            setIsPaused(false);
          },
        },
      ]);
    },
    [resetUser, t],
  );

  useEffect(() => {
    const fetchData = async () => {
      const message = await refreshableFetch(keepLoggedIn, token);
      console.log(message);
      if (message.status === 'LoggoutAlert') {
        setIsPaused(true);
        showAlert(LOGOUT);
      } else if (message.status === 'AuthenticationAlert') {
        setIsPaused(true);
        showAlert(AUTHENTICATION);
      } else if (message.status === 'SuccesfulRefresh') {
        setToken(message.token);
      }
    };

    if (!isPaused) {
      const intervalId = setInterval(() => {
        fetchData();
      }, TOKEN_REFRESH_INTERVAL); // Every 5 seconds

      // Cleanup function to clear the interval when the component is unmounted or if the effect is rerun.
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [setToken, keepLoggedIn, resetUser, isPaused, showAlert, token]);
};

export default TokenManager;
