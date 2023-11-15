import {useEffect} from 'react';
import {Alert} from 'react-native';
import {useState, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useRecoilState} from 'recoil';
import {useResetRecoilState} from 'recoil';
import {userState} from '../recoil/atoms/User/userState';
import {UserPreferencesState} from '../recoil/atoms/UserPreferences/UserPreferencesState';
import {TokensUtils} from 'react-native-keycloak-plugin';
import {signOut, RefreshToken} from './auth';

const LOGOUT = 'Logout';
const AUTHENTICATION = 'Authentication';
const TOKEN_REFRESH_THRESHOLD = 20;
const TOKEN_REFRESH_INTERVAL = 5000;

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
  const [isPaused, setIsPaused] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const resetUser = useResetRecoilState(userState);
  const [userPreferences, setUserPreferences] =
    useRecoilState(UserPreferencesState);

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
      const message = await refreshableFetch(
        userPreferences.keepLoggedIn,
        user.token,
      );
      if (message.status === 'LoggoutAlert') {
        setIsPaused(true);
        showAlert(LOGOUT);
      } else if (message.status === 'AuthenticationAlert') {
        setIsPaused(true);
        showAlert(AUTHENTICATION);
      } else if (message.status === 'SuccesfulRefresh') {
        setUser(currentUser => ({
          ...currentUser,
          token: message.token,
        }));
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
  }, [userPreferences, isPaused, showAlert, user, setUser, resetUser]);
};

export default TokenManager;
