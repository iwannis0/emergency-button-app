import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import globalStyle from '../../assets/styles/globalStyle';
import {useTranslation} from 'react-i18next';
import NavigationButton from '../../components/NavigationButton/NavigationButton';
import styles from './style';
import CountryFlag from 'react-native-country-flag';
import {useRecoilState} from 'recoil';
import {UserPreferencesState} from '../../features/recoil/atoms/UserPreferences/UserPreferencesState';
import i18n from '../../assets/translations/i18next';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import {LANGUAGE_ISO_CODE} from '../../common/constants/constants';

const MedicalHistoryScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [userPreferences, setUserPreferences] =
    useRecoilState(UserPreferencesState);
  const [LanguageModalVisible, setLanguageModalVisible] = React.useState(false);

  return (
    <SafeAreaView>
      <View style={[globalStyle.marginTop60, globalStyle.backgroundWhite]}>
        <ModalComponent
          title={t('Language')}
          visibility={LanguageModalVisible}
          onClose={() => setLanguageModalVisible(false)}>
          <ScrollView>
            <NavigationButton
              type={'withIcon'}
              countryIso={'gb'}
              title={'English'}
              onPress={() => {
                i18n.changeLanguage('en');
                setUserPreferences(currentUserPreferences => ({
                  ...currentUserPreferences,
                  language: 'English',
                }));
                setLanguageModalVisible(false);
              }}
              bottomBorderStyle={globalStyle.bottomBorderL3}
              titleStyle={globalStyle.descriptionBlackL1}
            />
            <NavigationButton
              type={'withIcon'}
              countryIso={'gr'}
              title={t('Ελληνικά')}
              onPress={() => {
                i18n.changeLanguage('gr');
                setUserPreferences(currentUserPreferences => ({
                  ...currentUserPreferences,
                  language: 'Greek',
                }));
                setLanguageModalVisible(false);
              }}
              bottomBorderStyle={globalStyle.bottomBorderL3}
              titleStyle={globalStyle.descriptionBlackL1}
            />
            <NavigationButton
              type={'withIcon'}
              countryIso={'pt'}
              title={'Português'}
              onPress={() => {
                i18n.changeLanguage('pt');
                setUserPreferences(currentUserPreferences => ({
                  ...currentUserPreferences,
                  language: 'Portuguese',
                }));
                setLanguageModalVisible(false);
              }}
              bottomBorderStyle={globalStyle.bottomBorderL3}
              titleStyle={globalStyle.descriptionBlackL1}
            />
            <NavigationButton
              type={'withIcon'}
              countryIso={'hu'}
              title={'Magyar'}
              onPress={() => {
                i18n.changeLanguage('hu');
                setUserPreferences(currentUserPreferences => ({
                  ...currentUserPreferences,
                  language: 'Hungarian',
                }));
                setLanguageModalVisible(false);
              }}
              bottomBorderStyle={globalStyle.bottomBorderL3}
              titleStyle={globalStyle.descriptionBlackL1}
            />
            <NavigationButton
              type={'withIcon'}
              countryIso={'si'}
              title={'Slovenský'}
              onPress={() => {
                i18n.changeLanguage('si');
                setUserPreferences(currentUserPreferences => ({
                  ...currentUserPreferences,
                  language: 'Slovak',
                }));
                setLanguageModalVisible(false);
              }}
              bottomBorderStyle={globalStyle.bottomBorderL3}
              titleStyle={globalStyle.descriptionBlackL1}
            />
            <NavigationButton
              type={'withIcon'}
              countryIso={'cz'}
              title={'Čeština'}
              onPress={() => {
                i18n.changeLanguage('cz');
                setUserPreferences(currentUserPreferences => ({
                  ...currentUserPreferences,
                  language: 'Czech',
                }));
                setLanguageModalVisible(false);
              }}
              titleStyle={globalStyle.descriptionBlackL1}
            />
          </ScrollView>
        </ModalComponent>

        <ScrollView>
          <NavigationButton
            type={'withArrow'}
            title={t('patientSummary.allergies.title')}
            onPress={() => {
              navigation.navigate('AllergiesScreen');
            }}
            bottomBorderStyle={globalStyle.bottomBorderL1}
            titleStyle={globalStyle.descriptionBlackL1}
          />
          <NavigationButton
            type={'withArrow'}
            title={t('patientSummary.problems.title')}
            onPress={() => {
              navigation.navigate('ProblemsScreen');
            }}
            bottomBorderStyle={globalStyle.bottomBorderL1}
            titleStyle={globalStyle.descriptionBlackL1}
          />
          <NavigationButton
            type={'withArrow'}
            title={t('patientSummary.devices.title')}
            onPress={() => {
              navigation.navigate('DevicesScreen');
            }}
            bottomBorderStyle={globalStyle.bottomBorderL1}
            titleStyle={globalStyle.descriptionBlackL1}
          />
          <NavigationButton
            type={'withArrow'}
            title={t('patientSummary.medication-summary.title')}
            onPress={() => {
              navigation.navigate('MedicationSummaryScreen');
            }}
            bottomBorderStyle={globalStyle.bottomBorderL1}
            titleStyle={globalStyle.descriptionBlackL1}
          />

          <NavigationButton
            type={'withArrow'}
            title={t('patientSummary.gynaecological.title')}
            onPress={() => {
              navigation.navigate('GynecologicalHistoryScreen');
            }}
            bottomBorderStyle={globalStyle.bottomBorderL1}
            titleStyle={globalStyle.descriptionBlackL1}
          />
          <NavigationButton
            type={'withArrow'}
            title={t('patientSummary.social-history.title')}
            onPress={() => {
              navigation.navigate('SocialHistoryScreen');
            }}
            bottomBorderStyle={globalStyle.bottomBorderL1}
            titleStyle={globalStyle.descriptionBlackL1}
          />
          <NavigationButton
            type={'withArrow'}
            title={t('patientSummary.immunization.title')}
            onPress={() => {
              navigation.navigate('ImmunizationScreen');
            }}
            bottomBorderStyle={globalStyle.bottomBorderL1}
            titleStyle={globalStyle.descriptionBlackL1}
          />
          <NavigationButton
            type={'withArrow'}
            title={t('patientSummary.plan-of-care.title')}
            onPress={() => {
              navigation.navigate('PlanOfCareScreen');
            }}
            titleStyle={globalStyle.descriptionBlackL1}
          />
        </ScrollView>
      </View>
      <TouchableOpacity
        style={[globalStyle.fullyCentered, styles.changeLanguageContainer]}
        onPress={() => {
          setLanguageModalVisible(true);
        }}>
        <Text
          style={[globalStyle.descriptionBlackL3, styles.changeLanguageText]}>
          {t('general.view-language')}
        </Text>
        <View style={[globalStyle.row, styles.displayLanguageContainer]}>
          <CountryFlag
            isoCode={LANGUAGE_ISO_CODE[userPreferences.language]}
            size={25}
          />
          <Text style={globalStyle.descriptionBlackL2}>
            {'  '}
            {t(`general.${userPreferences.language.toLowerCase()}`)}
          </Text>
        </View>
        <Text style={[globalStyle.descriptionBlackL2, styles.changeLanguage]}>
          {t('general.change-language')}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MedicalHistoryScreen;
