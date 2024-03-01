import {ScrollView} from 'react-native';
import NavigationButton from '../NavigationButton/NavigationButton';
import i18n from '../../assets/translations/i18next';
import globalStyle from '../../assets/styles/globalStyle';
import ModalComponent from '../ModalComponent/ModalComponent';
import React from 'react';
import {t} from 'i18next';

const LanguageSelector = ({isVisible, onClose, setUserPreferences}) => {
  const changeLanguage = (languageCode: string, languageName: string) => {
    i18n.changeLanguage(languageCode);
    setUserPreferences(currentUserPreferences => ({
      ...currentUserPreferences,
      language: languageName,
    }));
    onClose(); // Close the modal after changing the language
  };

  return (
    <ModalComponent
      title={t('general.language')}
      visibility={isVisible}
      onClose={onClose}>
      <ScrollView>
        <NavigationButton
          type={'withIcon'}
          countryIso={'gb'}
          title={t('English')}
          onPress={() => changeLanguage('en', 'English')}
          bottomBorderStyle={globalStyle.bottomBorderL3}
          titleStyle={globalStyle.descriptionBlackL1}
        />
        <NavigationButton
          type={'withIcon'}
          countryIso={'gr'}
          title={t('Greek')}
          onPress={() => changeLanguage('gr', 'Greek')}
          bottomBorderStyle={globalStyle.bottomBorderL3}
          titleStyle={globalStyle.descriptionBlackL1}
        />
        <NavigationButton
          type={'withIcon'}
          countryIso={'pt'}
          title={t('Portuguese')}
          onPress={() => changeLanguage('pt', 'Portuguese')}
          bottomBorderStyle={globalStyle.bottomBorderL3}
          titleStyle={globalStyle.descriptionBlackL1}
        />
        <NavigationButton
          type={'withIcon'}
          countryIso={'hu'}
          title={t('Hungarian')}
          onPress={() => changeLanguage('hu', 'Hungarian')}
          bottomBorderStyle={globalStyle.bottomBorderL3}
          titleStyle={globalStyle.descriptionBlackL1}
        />
        <NavigationButton
          type={'withIcon'}
          countryIso={'si'}
          title={t('Slovak')}
          onPress={() => changeLanguage('si', 'Slovak')}
          bottomBorderStyle={globalStyle.bottomBorderL3}
          titleStyle={globalStyle.descriptionBlackL1}
        />
        <NavigationButton
          type={'withIcon'}
          countryIso={'cz'}
          title={t('Czech')}
          onPress={() => changeLanguage('cz', 'Czech')}
          titleStyle={globalStyle.descriptionBlackL1}
        />
      </ScrollView>
    </ModalComponent>
  );
};

export default LanguageSelector;
