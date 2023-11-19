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
import {
  copyToClipboard,
  generateSHL,
  openURL,
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
            <ExpandableView
              title={t('Gynecological History')}
              expandLevel={0}
            />
            <ExpandableView title={t('Social History')} expandLevel={0} />
            <ExpandableView title={t('Immunization')} expandLevel={0} />
            <ExpandableView title={t('Plan of Care')} expandLevel={0} />
          </ScrollView>
        </View>

        <ModalComponent
          title={''}
          visibility={modalVisible}
          onClose={() => setModalVisible(false)}>
          <View style={[globalStyle.fullyCentered, styles.marginTop5]}>
            <View>
              <QRCode
                value={shl}
                size={horizontalScale(275)}
                logo={require('../../assets/images/smart-logo.png')}
                logoSize={horizontalScale(50)}
              />
            </View>

            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={[styles.button, globalStyle.fullyCentered]}
                onPress={() => {
                  setShl(generateSHL());
                  setModalVisible(true);
                }}>
                <FontAwesomeIcon
                  icon={faShareNodes}
                  color="#FFFFFF"
                  size={horizontalScale(18)}
                />
                <Text style={styles.buttonText}>Share</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, globalStyle.fullyCentered]}
                onPress={() => {
                  copyToClipboard(shl);
                }}>
                <FontAwesomeIcon
                  icon={faCopy}
                  color="#FFFFFF"
                  size={horizontalScale(18)}
                />
                <Text style={styles.buttonText}>Αντιγραφή</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.button, globalStyle.fullyCentered]}
              onPress={() => {
                showAlertAndOpenURL(shl);
              }}>
              <FontAwesomeIcon
                icon={faUpRightFromSquare}
                color="#FFFFFF"
                size={horizontalScale(18)}
              />
              <Text style={styles.buttonText}>Άνοιγμα</Text>
            </TouchableOpacity>
          </View>
        </ModalComponent>

        <TouchableOpacity
          style={[globalStyle.Button, globalStyle.fullyCentered]}
          onPress={() => {
            setShl(generateSHL());
            setModalVisible(true);
          }}>
          <Text style={globalStyle.buttonText}>Share Patient Summary</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MedicalHistoryScreen;
