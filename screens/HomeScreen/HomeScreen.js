import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import NavigationButton from '../../components/NavigationButton/NavigationButton';
import styles from './style';
import globalStyle from '../../assets/styles/globalStyle';
import {useTranslation} from 'react-i18next';
import {useRecoilState} from 'recoil';
import {userState} from '../../features/recoil/atoms/User/userState';
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

const MyHealthScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [shl, setShl] = React.useState(null);
  const [pin, setPin] = React.useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ImageContainer}>
        <Pressable
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <Image
            tintColor={'#85CECA'}
            source={require('../../assets/images/Profile/default.png')}
            style={styles.ImageStyle}
          />
          <Text style={styles.ImageInitials}>
            {user && user.name ? user.name[0] : 'N'}
            {user && user.surname ? user.surname[0] : 'A'}
          </Text>
        </Pressable>
      </View>
      <ScrollView style={globalStyle.marginTop60}>
        <NavigationButton
          type={'withIcon'}
          title={t('Alerts')}
          image={require('../../assets/images/forNavigation/Alert.png')}
          onPress={() => {
            navigation.navigate('Alerts');
          }}
          bottomBorderStyle={globalStyle.bottomBorderL3}
          titleStyle={globalStyle.descriptionBlackL1}
        />
        <NavigationButton
          type={'withIcon'}
          title={t('Medical History')}
          image={require('../../assets/images/forNavigation/Medical.png')}
          onPress={() => {
            navigation.navigate('Medical History');
          }}
          bottomBorderStyle={globalStyle.bottomBorderL3}
          titleStyle={globalStyle.descriptionBlackL1}
        />
        <NavigationButton
          type={'withIcon'}
          title={t('Clinical Examination')}
          image={require('../../assets/images/forNavigation/Clinical.png')}
          onPress={() => {
            navigation.navigate('Clinical Examination');
          }}
          bottomBorderStyle={globalStyle.bottomBorderL3}
          titleStyle={globalStyle.descriptionBlackL1}
        />
        <NavigationButton
          type={'withIcon'}
          title={t('Laboratory')}
          image={require('../../assets/images/forNavigation/Laboratory.png')}
          onPress={() => {
            navigation.navigate('Laboratory');
          }}
          bottomBorderStyle={globalStyle.bottomBorderL3}
          titleStyle={globalStyle.descriptionBlackL1}
        />
        <NavigationButton
          type={'withIcon'}
          title={t('Imaging')}
          image={require('../../assets/images/forNavigation/Imaging.png')}
          onPress={() => {
            navigation.navigate('Imaging');
          }}
          bottomBorderStyle={globalStyle.bottomBorderL3}
          titleStyle={globalStyle.descriptionBlackL1}
        />
        <NavigationButton
          type={'withIcon'}
          title={t('Episodes of Care and Visits')}
          image={require('../../assets/images/forNavigation/Episodes.png')}
          onPress={() => {
            navigation.navigate('Episodes of Care and Visits');
          }}
          titleStyle={globalStyle.descriptionBlackL1}
        />
      </ScrollView>

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
    </SafeAreaView>
  );
};

export default MyHealthScreen;
