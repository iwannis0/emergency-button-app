import {encode as btoa} from 'base-64';
import {Alert, Linking} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {Toast}

export function generateSHL() {
  const expirationTime = Math.floor(Date.now() / 1000) + 3600;
  const base64UrlEncode = (url: string) => {
    const base64String = btoa(url);

    return base64String
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/[=]+$/, '');
  };

  const shlinkJsonPayload = {
    url: 'https://ehr.example.org/qr/Y9xwkUdtmN9wwoJoN3ffJIhX2UGvCL1JnlPVNL3kDWM/m',
    key: 'rxTgYlOaKJPFtcEd0qcceN8wEU4p94SqAwIWQe6uX7Q',
    exp: expirationTime,
    flag: 'P',
  };

  const encodedPayload = base64UrlEncode(JSON.stringify(shlinkJsonPayload));

  const shlinkBare = 'shlink:/' + encodedPayload;

  const shlink = 'https://viewer.example.org#' + shlinkBare;
  // "https://viewer.example.org#shlink:/eyJ1cmwiOiJodHRwczovL2Voci5leGFtcGxlLm9yZy9xci9ZOXh3a1VkdG1OOXd3b0pvTjNmZkpJaFgyVUd2Q0wxSm5sUFZOTDNrRFdNL20iLCJmbGFnIjoiTFAiLCJrZXkiOiJyeFRnWWxPYUtKUEZ0Y0VkMHFjY2VOOHdFVTRwOTRTcUF3SVdRZTZ1WDdRIiwibGFiZWwiOiJCYWNrLXRvLXNjaG9vbCBpbW11bml6YXRpb25zIGZvciBPbGl2ZXIgQnJvd24ifQ"
  console.log(shlink);
  return shlink;
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
