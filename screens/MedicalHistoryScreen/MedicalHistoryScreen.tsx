import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
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
      </View>
    </SafeAreaView>
  );
};

export default MedicalHistoryScreen;
