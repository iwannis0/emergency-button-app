import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import ExpandableView from '../../components/ExpandableView/ExpandableView';
import styles from './style';
import globalStyle from '../../assets/styles/globalStyle';
import {useTranslation} from 'react-i18next';
import TravelHistory from './Contents/EpidemiologicalHistory/TravelHistory';
import AllergiesAndIntolerances from './Contents/MedicalPersonalHistory/AllergiesAndIntolerances';
import DevicesAndImplants from './Contents/MedicalPersonalHistory/DevicesAndImplants';
import MedicationSummary from './Contents/MedicalPersonalHistory/MedicationSummary';
import ProblemsAndProcedures from './Contents/MedicalPersonalHistory/ProblemsAndProcedures';
import PregnancyHistory from './Contents/GynaecologicalHistory/PregnancyHistory';
import PregnancyOutcome from './Contents/GynaecologicalHistory/PregnancyOutcome';
import {
  copyToClipboard,
  generateSHL,
  sendEmail,
  showAlertAndOpenURL,
} from '../../features/SHL/shl';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import QRCode from 'react-native-qrcode-svg';
import {horizontalScale} from '../../assets/styles/scaling';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faShareNodes,
  faCopy,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';

const MedicalHistoryScreen = () => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [shl, setShl] = React.useState(null);
  const [pin, setPin] = React.useState(null);

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
                title={t('medicalHistory.epidemiologicalHistory.title')}
                expandLevel={0}>
                <TravelHistory />
              </ExpandableView>
            )}
            <ExpandableView
              title={t('medicalHistory.medicalPersonalHistory.title')}
              expandLevel={0}>
              <ExpandableView
                title={t('medicalHistory.allergiesAndIntolerances.title')}
                expandLevel={1}>
                <AllergiesAndIntolerances />
              </ExpandableView>
              <ExpandableView
                title={t('medicalHistory.problemsAndProcedures.title')}
                expandLevel={1}>
                <ProblemsAndProcedures />
              </ExpandableView>
              <ExpandableView
                title={t('medicalHistory.devicesAndImplants.title')}
                expandLevel={1}>
                <DevicesAndImplants />
              </ExpandableView>
              <ExpandableView
                title={t('medicalHistory.medicationSummary.title')}
                expandLevel={1}>
                <MedicationSummary />
              </ExpandableView>
            </ExpandableView>
            <ExpandableView
              title={t('medicalHistory.gynecologicalHistory.title')}
              expandLevel={0}>
              <ExpandableView
                title={t('medicalHistory.pregnancyOutcome.title')}
                expandLevel={1}>
                <PregnancyOutcome />
              </ExpandableView>
              <ExpandableView
                title={t('medicalHistory.pregnancyHistory.title')}
                expandLevel={1}>
                <PregnancyHistory />
              </ExpandableView>
            </ExpandableView>
            <ExpandableView
              title={t('medicalHistory.socialHistory.title')}
              expandLevel={0}
            />
            <ExpandableView
              title={t('medicalHistory.immunization.title')}
              expandLevel={0}
            />
            <ExpandableView
              title={t('medicalHistory.planOfCare.title')}
              expandLevel={0}
            />
          </ScrollView>
        </View>

        <ModalComponent
          title={''}
          visibility={modalVisible}
          onClose={() => setModalVisible(false)}>
          <View style={globalStyle.fullyCentered}>
            <View>
              <QRCode
                value={shl}
                size={horizontalScale(240)}
                logo={require('../../assets/images/smart-logo.png')}
                logoSize={horizontalScale(45)}
              />
            </View>
            <Text style={[globalStyle.descriptionBlackL1, styles.pinContainer]}>
              {t('medicalHistory.smartlinks.pin')} {pin}
            </Text>
            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={[styles.button, globalStyle.fullyCentered]}
                onPress={() => {
                  sendEmail(
                    '',
                    t('medicalHistory.smartlinks.emai-subject'),
                    t('medicalHistory.smartlinks.email-body') + '\n\n' + shl,
                  );
                }}>
                <FontAwesomeIcon
                  icon={faShareNodes}
                  color="#FFFFFF"
                  size={horizontalScale(18)}
                />
                <Text style={styles.buttonText}>
                  {t('medicalHistory.smartlinks.share')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, globalStyle.fullyCentered]}
                onPress={() => {
                  copyToClipboard(
                    shl,
                    t('medicalHistory.smartlinks.copy-alert'),
                    t('medicalHistory.smartlinks.copy-alert-continue'),
                  );
                }}>
                <FontAwesomeIcon
                  icon={faCopy}
                  color="#FFFFFF"
                  size={horizontalScale(18)}
                />
                <Text style={styles.buttonText}>
                  {t('medicalHistory.smartlinks.copy')}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.button, globalStyle.fullyCentered]}
              onPress={() => {
                showAlertAndOpenURL(
                  shl,
                  t('medicalHistory.smartlinks.open-alert-title'),
                  t('medicalHistory.smartlinks.open-alert-description'),
                  t('medicalHistory.smartlinks.open-alert-cancel'),
                  t('medicalHistory.smartlinks.open-alert-continue'),
                );
              }}>
              <FontAwesomeIcon
                icon={faUpRightFromSquare}
                color="#FFFFFF"
                size={horizontalScale(18)}
              />
              <Text style={styles.buttonText}>
                {t('medicalHistory.smartlinks.open')}
              </Text>
            </TouchableOpacity>
          </View>
        </ModalComponent>

        <TouchableOpacity
          style={[globalStyle.Button, globalStyle.fullyCentered]}
          onPress={() => {
            const result = generateSHL();
            setShl(result.shlink);
            setPin(result.pin);
            setModalVisible(true);
          }}>
          <Text style={globalStyle.buttonText}>
            {t('medicalHistory.smartlinks.main-button')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MedicalHistoryScreen;
