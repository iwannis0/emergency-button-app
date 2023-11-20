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

export const copyToClipboard = (url: string) => {
  Clipboard.setString(url);
  Alert.alert('Copied to Clipboard!');
};

const openURL = (url: string) => {
  Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
};

export const showAlertAndOpenURL = (url: string) => {
  Alert.alert(
    'Open Link',
    'Do you want to open the link in your browser?',
    [
      {text: 'Cancel', style: 'cancel'},
      {text: 'OK', onPress: () => openURL(url)},
    ],
    {cancelable: true},
  );
};
