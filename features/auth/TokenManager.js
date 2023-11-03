const TOKEN_REFRESH_INTERVAL = 5000; // five minutes
const TOKEN_REFRESH_THRESHOLD = 20;
import {TokensUtils, TokenStorage} from 'react-native-keycloak-plugin';
import {RefreshToken} from '../../features/auth/auth';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {
  tokenSelector,
  keepLoggedInSelector,
} from '../../features/recoil/selectors/userSelectors';
import {useEffect} from 'react';
import {Alert} from 'react-native';
import {useResetRecoilState} from 'recoil';
import {userState} from '../../features/recoil/atoms/User/userState';
import {signOut} from '../../features/auth/auth';
import {useState, useCallback} from 'react';
import {useTranslation} from 'react-i18next';

async function handleLogout(resetUser) {
  const logoutResponse = await signOut();
  if (logoutResponse === 'Success') {
    resetUser();
  }
  return;
}

async function refreshableFetch(keepLoggedIn) {
  if ((await TokenStorage.getTokens()) === undefined) {
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
  const setToken = useSetRecoilState(tokenSelector);
  const keepLoggedIn = useRecoilValue(keepLoggedInSelector);
  const resetUser = useResetRecoilState(userState);
  const [isPaused, setIsPaused] = useState(false);

  const showLogoutAlert = useCallback(() => {
    Alert.alert(t('Alert-Title'), t('Alert-Description'), [
      {
        text: 'OK',
        onPress: () => {
          handleLogout(resetUser);
          setIsPaused(false);
        },
      },
    ]);
  }, [resetUser, t]);

  useEffect(() => {
    const fetchData = async () => {
      const message = await refreshableFetch(keepLoggedIn);
      console.log(message);
      if (message.status === 'LoggoutAlert') {
        setIsPaused(true);
        showLogoutAlert();
      } else if (message.status === 'SuccesfulRefresh') {
        // Fingerprint
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
  }, [setToken, keepLoggedIn, resetUser, isPaused, showLogoutAlert]);
};

export default TokenManager;
