import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import styles from './style';
import globalStyle from '../../assets/styles/globalStyle';
import {useTranslation} from 'react-i18next';
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
import {useRecoilState} from 'recoil';
import {userState} from '../../features/recoil/atoms/User/userState';
import NavigationButton from '../../components/NavigationButton/NavigationButton';

const MedicalHistoryScreen = navigation => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [shl, setShl] = React.useState(null);
  const [pin, setPin] = React.useState(null);

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
                  title={t('medicalHistory.allergiesAndIntolerances.title')}
                  onPress={() => {
                    navigation.navigate('AllergiesScreen');
                  }}
                  bottomBorderStyle={globalStyle.bottomBorderL2}
                  titleStyle={globalStyle.descriptionBlackL2}
                />
                <NavigationButton
                  type={'withArrow'}
                  title={t('medicalHistory.problemsAndProcedures.title')}
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
            <View style={styles.actionButtonRow}>
              <TouchableOpacity
                style={[styles.actionButtonsSHL, globalStyle.fullyCentered]}
                onPress={() => {
                  sendEmail(
                    '',
                    t('medicalHistory.smartlinks.emai-subject'),
                    t('medicalHistory.smartlinks.email-body-partA') +
                      shl +
                      t('medicalHistory.smartlinks.email-body-partB') +
                      user.surname +
                      ' ' +
                      user.name,
                  );
                }}>
                <FontAwesomeIcon
                  icon={faShareNodes}
                  color="#FFFFFF"
                  size={horizontalScale(18)}
                />
                <Text style={styles.actionButtonText}>
                  {t('medicalHistory.smartlinks.share')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButtonsSHL, globalStyle.fullyCentered]}
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
                <Text style={styles.actionButtonText}>
                  {t('medicalHistory.smartlinks.copy')}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.actionButtonsSHL, globalStyle.fullyCentered]}
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
              <Text style={styles.actionButtonText}>
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
