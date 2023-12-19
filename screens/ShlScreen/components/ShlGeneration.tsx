import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useRecoilState} from 'recoil';
import {summaryResourcesState} from '../../../features/recoil/atoms/SummaryResources/summaryResourcesState';
import globalStyle from '../../../assets/styles/globalStyle';
import styles from './SelectionStyles';
import {generateSHLink} from '../api/generateLink';
import {userState} from '../../../features/recoil/atoms/User/userState';
import dayjs from 'dayjs';
import {DATE_FORMAT} from '../../../common/constants/constants';
import {encode as btoa} from 'base-64';
import {shlHistoryState} from '../../../features/recoil/atoms/ShlHistory/shlHistoryState';
import {IShl} from '../../../features/recoil/interfaces/IShl';

interface Props {
  closeModal: (visible: boolean) => void;
}

const ShlGeneration = (props: Props) => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);
  const [summaryResources, __] = useRecoilState(summaryResourcesState);
  const [shlHistory, setShlHistory] = useRecoilState(shlHistoryState);

  const [label, setLabel] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState(0);
  const expirationOptions = [
    t('shl.generation.1h'),
    t('shl.generation.4h'),
    t('shl.generation.12h'),
    t('shl.generation.24h'),
  ];

  const validatePassword = text => {
    if (text.length >= 6 && text.length <= 15) {
      return true;
    } else {
      setError(
        text.length >= 6 && text.length <= 15
          ? ''
          : t('shl.generation.password-error'),
      );
      return false;
    }
  };

  const checkAndGenerate = async () => {
    if (validatePassword(password)) {
      const name =
        label === ''
          ? `Link generated on ${dayjs().format(DATE_FORMAT)}`
          : label;
      let hoursExpiration = 1;
      if (selectedOption === 1) {
        hoursExpiration = 4;
      }
      if (selectedOption === 2) {
        hoursExpiration = 12;
      }
      if (selectedOption === 3) {
        hoursExpiration = 24;
      }
      const expirationDate = dayjs().add(hoursExpiration, 'hour').toString();
      const minifiedResources = JSON.stringify(summaryResources.resources);
      await generateSHLink(
        user.token,
        user.id,
        password,
        name,
        expirationDate,
        btoa(minifiedResources),
      )
        .then(response => {
          const newLink: IShl = {
            ...response.data[0],
            passcode: password,
          };
          const updatedShlHistory = {
            shLinks: [...shlHistory.shLinks, newLink],
          };
          setShlHistory(updatedShlHistory);
          console.log(shlHistory);
          return 'Success';
        })
        .catch(errorMessage => {
          console.log(errorMessage);
          return 'Failure';
        });
    }
    return 'Wrong password';
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={globalStyle.descriptionBlackL1}>
          {t('shl.generation.label-title')}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={t('shl.generation.label-placeholder')}
          value={label}
          onChangeText={setLabel}
          maxLength={42}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={globalStyle.descriptionBlackL1}>
          {t('shl.generation.passcode-title')}
        </Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder={t('shl.generation.passcode-placeholder')}
          value={password}
          onChangeText={setPassword}
          maxLength={16}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={globalStyle.descriptionBlackL1}>
          {t('shl.generation.expiration-title')}
        </Text>
        <View style={styles.optionsContainer}>
          {expirationOptions.map((option, index) => (
            <View
              key={index}
              style={
                index % 2 === 0 ? styles.firstColumn : styles.secondColumn
              }>
              <Switch
                onValueChange={() => setSelectedOption(index)}
                value={selectedOption === index}
              />
              <Text style={globalStyle.descriptionBlackL2}>{option}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[globalStyle.Button, styles.createButton]}
        onPress={async () => {
          const result = await checkAndGenerate();
          switch (result) {
            case 'Success':
              Alert.alert(
                'Link Created',
                'The link was succesfully created! You can find it in the SHL History.',
                [
                  {
                    text: 'Continue',
                    onPress: () => props.closeModal(false),
                  },
                ],
                {cancelable: false},
              );
              break;
            case 'Failure':
              Alert.alert(
                'Failure',
                'Something went wrong. Please try again later.',
                [{text: 'OK'}],
                {cancelable: false},
              );
              break;
            default:
              break;
          }
        }}>
        <Text style={globalStyle.buttonText}>{t('shl.generation.create')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShlGeneration;
