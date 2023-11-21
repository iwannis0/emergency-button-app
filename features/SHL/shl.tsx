import {encode as btoa} from 'base-64';
import {Alert, Linking} from 'react-native';
import Clipboard from '@react-native-community/clipboard';

const base64UrlEncode = (url: string) => {
  const base64String = btoa(url);

  return base64String
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/[=]+$/, '');
};

export function generateSHL() {
  const pin = Math.floor(100000 + Math.random() * 900000);

  const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
  const shlinkJsonPayload = {
    url: 'https://ehr.example.org/qr/Y9xwkUdtmN9wwoJoN3ffJIhX2UGvCL1JnlPVNL3kDWM/m',
    key: 'mustbe43characterswith32randombytesbase64urlencoded',
    exp: expirationTime,
    flag: 'P',
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(shlinkJsonPayload));
  const shlinkBare = 'shlink:/' + encodedPayload;
  const shlink = 'https://viewer.example.org#' + shlinkBare;
  return {shlink, pin};
}

export const copyToClipboard = (
  url: string,
  alertTitle: string,
  alertContinue: string,
) => {
  Clipboard.setString(url);
  Alert.alert(alertTitle, '', [{text: alertContinue}]);
};

const openURL = (url: string) => {
  Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
};

export function showAlertAndOpenURL(
  url: string,
  title: string,
  message: string,
  cancel: string,
  ok: string,
) {
  Alert.alert(
    title,
    message,
    [
      {text: cancel, style: 'cancel'},
      {text: ok, onPress: () => openURL(url)},
    ],
    {cancelable: true},
  );
}

export function sendEmail(email: string, subject: string, body: string) {
  const url = `mailto:${email}?subject=${subject}&body=${body}`;

  Linking.openURL(url).catch(err => console.error('An error occurred', err));
}
