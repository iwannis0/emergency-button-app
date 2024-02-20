import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import globalStyle from '../../../../assets/styles/globalStyle';
import {} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import {useTranslation} from 'react-i18next';
import {horizontalScale} from '../../../../assets/styles/scaling';
import {
  sendEmail,
  copyToClipboard,
  showAlertAndOpenURL,
} from '../../../../features/SHL/viewSHL';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faShareNodes,
  faCopy,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import dayjs from 'dayjs';
import {DATE_TIME_FORMAT} from '../../../../common/constants/constants';

const ViewLink = (props: any) => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);

  return (
    <SafeAreaView style={globalStyle.fullyCentered}>
      <View style={styles.datesContainer}>
        <Text style={globalStyle.descriptionBlackL1}>
          {t('shl.published-date')}:
        </Text>
        <Text style={[globalStyle.descriptionBlackL1, styles.dates]}>
          {dayjs(props.dateGenerated).format(DATE_TIME_FORMAT)}
        </Text>
        <Text style={globalStyle.descriptionBlackL1}>
          {t('shl.expiration-date')}:
        </Text>
        <Text style={[globalStyle.descriptionBlackL1, styles.dates]}>
          {dayjs(props.expirationDate).format(DATE_TIME_FORMAT)}
        </Text>
      </View>

      <View>
        <QRCode
          value={props.shlink}
          size={horizontalScale(200)}
          logo={require('../../../../assets/images/smart-logo.png')}
          logoSize={horizontalScale(30)}
        />
      </View>
      <Text style={[globalStyle.descriptionBlackL1, styles.pinContainer]}>
        {t('medicalHistory.smartlinks.pin')} {props.passcode}
      </Text>
      <View style={styles.actionButtonRow}>
        <TouchableOpacity
          style={[styles.actionButtonsSHL, globalStyle.fullyCentered]}
          onPress={() => {
            sendEmail(
              '',
              t('medicalHistory.smartlinks.emai-subject'),
              t('medicalHistory.smartlinks.email-body-partA') +
                props.shlink +
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
              props.shlink,
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
            props.shlink,
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
    </SafeAreaView>
  );
};

ViewLink.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  shlink: PropTypes.string.isRequired,
  passcode: PropTypes.string.isRequired,
  expirationDate: PropTypes.string.isRequired,
  dateGenerated: PropTypes.string.isRequired,
};

export default ViewLink;
