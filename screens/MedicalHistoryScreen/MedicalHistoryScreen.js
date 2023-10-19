import React from 'react';
import {View} from 'react-native';
import ExpandableView from '../../components/ExpandableView/ExpandableView';
import styles from '../AlertsScreen/style';
import globalStyle from '../../assets/styles/globalStyle';
import {useTranslation} from 'react-i18next';
import TravelHistory from './Contents/EpidemiologicalHistory/TravelHistory';
import AllergiesAndIntolerances from './Contents/MedicalPersonalHistory/AllergiesAndIntolerances';

const MedicalHistoryScreen = () => {
  const {t} = useTranslation();

  // ***** KEEP FUTURE REFERENCE FOR MODULARITY *****
  // USER SETTINGS WILL DEFINE WHAT THE USER SEES
  const showTravelHistory = true;

  return (
    <View style={styles.background}>
      <View style={globalStyle.marginTop60}>
        {showTravelHistory && (
          <ExpandableView title={t('Epidimiological History')}>
            <TravelHistory />
          </ExpandableView>
        )}
        <ExpandableView title={t('Medical Personal History')}>
          <AllergiesAndIntolerances />
          {/*<DevicesAndImplants />*/}
          {/*<MedicationSummary />*/}
          {/*<ProblemsAndProcedures />*/}
        </ExpandableView>
        <ExpandableView title={t('Gynecological History')} />
        <ExpandableView title={t('Social History')} />
        <ExpandableView title={t('Immunization')} />
        <ExpandableView title={t('Plan of Care')} />
      </View>
    </View>
  );
};

export default MedicalHistoryScreen;
