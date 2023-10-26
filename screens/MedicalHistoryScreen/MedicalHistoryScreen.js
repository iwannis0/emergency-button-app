import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import ExpandableView from '../../components/ExpandableView/ExpandableView';
import styles from '../AlertsScreen/style';
import globalStyle from '../../assets/styles/globalStyle';
import {useTranslation} from 'react-i18next';
import TravelHistory from './Contents/EpidemiologicalHistory/TravelHistory';
import AllergiesAndIntolerances from './Contents/MedicalPersonalHistory/AllergiesAndIntolerances';
import DevicesAndImplants from './Contents/MedicalPersonalHistory/DevicesAndImplants';
import MedicationSummary from './Contents/MedicalPersonalHistory/MedicationSummary';
import ProblemsAndProcedures from './Contents/MedicalPersonalHistory/ProblemsAndProcedures';
import PregnancyHistory from './Contents/GynaecologicalHistory/PregnancyHistory';
import PregnancyOutcome from './Contents/GynaecologicalHistory/PregnancyOutcome';

const MedicalHistoryScreen = () => {
  const {t} = useTranslation();

  // ***** KEEP FUTURE REFERENCE FOR MODULARITY *****
  // USER SETTINGS WILL DEFINE WHAT THE USER SEES
  const showTravelHistory = true;

  return (
    <SafeAreaView>
      <View style={styles.background}>
        <View style={globalStyle.marginTop60}>
          <ScrollView>
            {showTravelHistory && (
              <ExpandableView
                title={t('Epidimiological History')}
                expandLevel={0}>
                <TravelHistory />
              </ExpandableView>
            )}
            <ExpandableView
              title={t('Medical Personal History')}
              expandLevel={0}>
              <ExpandableView
                title={t('Allergies and Intolerances')}
                expandLevel={1}>
                <AllergiesAndIntolerances />
              </ExpandableView>
              <ExpandableView
                title={t('Problems and Procedures')}
                expandLevel={1}>
                <ProblemsAndProcedures />
              </ExpandableView>
              <ExpandableView title={t('Devices and Implants')} expandLevel={1}>
                <DevicesAndImplants />
              </ExpandableView>
              <ExpandableView title={t('Medication Summary')} expandLevel={1}>
                <MedicationSummary />
              </ExpandableView>
            </ExpandableView>
            <ExpandableView title={t('Gynecological History')} expandLevel={0}>
              <ExpandableView title={t('Pregnancy Outcome')} expandLevel={1}>
                <PregnancyOutcome />
              </ExpandableView>
              <ExpandableView title={t('Pregnancy History')} expandLevel={1}>
                <PregnancyHistory />
              </ExpandableView>
            </ExpandableView>
            <ExpandableView title={t('Social History')} expandLevel={0} />
            <ExpandableView title={t('Immunization')} expandLevel={0} />
            <ExpandableView title={t('Plan of Care')} expandLevel={0} />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MedicalHistoryScreen;
