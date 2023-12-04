import React from 'react';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';
import styles from './style';
import globalStyle from '../../assets/styles/globalStyle';
import {useTranslation} from 'react-i18next';
import NavigationButton from '../../components/NavigationButton/NavigationButton';

const MedicalHistoryScreen = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <SafeAreaView>
      <View style={globalStyle.backgroundWhite}>
        <View style={globalStyle.marginTop60}>
          <ScrollView>
            <NavigationButton
              type={'withArrow'}
              title={t('medicalHistory.epidemiologicalHistory.title')}
              onPress={() => {
                navigation.navigate('EpidemiologicalHistoryScreen');
              }}
              bottomBorderStyle={globalStyle.bottomBorderL1}
              titleStyle={globalStyle.descriptionBlackL1}
            />
            <View style={globalStyle.bottomBorderL1}>
              <View style={styles.PersonalHistoryContainer}>
                <Text
                  style={[
                    globalStyle.descriptionBlackL1,
                    styles.PersonalHistoryTitle,
                  ]}>
                  {t('medicalHistory.medicalPersonalHistory.title')}
                </Text>
                <NavigationButton
                  type={'withArrow'}
                  title={t(
                    'medicalHistory.medicalPersonalHistory.allergies.title',
                  )}
                  onPress={() => {
                    navigation.navigate('AllergiesScreen');
                  }}
                  bottomBorderStyle={globalStyle.bottomBorderL2}
                  titleStyle={globalStyle.descriptionBlackL2}
                />
                <NavigationButton
                  type={'withArrow'}
                  title={t(
                    'medicalHistory.medicalPersonalHistory.problems.title',
                  )}
                  onPress={() => {
                    navigation.navigate('ProblemsScreen');
                  }}
                  bottomBorderStyle={globalStyle.bottomBorderL2}
                  titleStyle={globalStyle.descriptionBlackL2}
                />
                <NavigationButton
                  type={'withArrow'}
                  title={t('medicalHistory.devicesAndImplants.title')}
                  onPress={() => {
                    navigation.navigate('DevicesScreen');
                  }}
                  bottomBorderStyle={globalStyle.bottomBorderL2}
                  titleStyle={globalStyle.descriptionBlackL2}
                />
                <NavigationButton
                  type={'withArrow'}
                  title={t('medicalHistory.medicationSummary.title')}
                  onPress={() => {
                    navigation.navigate('MedicationSummaryScreen');
                  }}
                  titleStyle={globalStyle.descriptionBlackL2}
                />
              </View>
            </View>

            <NavigationButton
              type={'withArrow'}
              title={t('medicalHistory.gynecologicalHistory.title')}
              onPress={() => {
                navigation.navigate('GynecologicalHistoryScreen');
              }}
              bottomBorderStyle={globalStyle.bottomBorderL1}
              titleStyle={globalStyle.descriptionBlackL1}
            />
            <NavigationButton
              type={'withArrow'}
              title={t('medicalHistory.socialHistory.title')}
              onPress={() => {
                navigation.navigate('SocialHistoryScreen');
              }}
              bottomBorderStyle={globalStyle.bottomBorderL1}
              titleStyle={globalStyle.descriptionBlackL1}
            />
            <NavigationButton
              type={'withArrow'}
              title={t('medicalHistory.immunization.title')}
              onPress={() => {
                navigation.navigate('ImmunizationScreen');
              }}
              bottomBorderStyle={globalStyle.bottomBorderL1}
              titleStyle={globalStyle.descriptionBlackL1}
            />
            <NavigationButton
              type={'withArrow'}
              title={t('medicalHistory.planOfCare.title')}
              onPress={() => {
                navigation.navigate('PlanOfCareScreen');
              }}
              titleStyle={globalStyle.descriptionBlackL1}
            />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MedicalHistoryScreen;
