import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import globalStyle from '../../../../assets/styles/globalStyle';
import QRCode from 'react-native-qrcode-svg';
import {useTranslation} from 'react-i18next';
import {horizontalScale} from '../../../../assets/styles/scaling';
import {
  sendEmail,
  copyToClipboard,
  showAlertAndOpenURL,
} from '../../../../features/SHL/shl';
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
import styles from './styles';
import {IShl} from '../../../../features/recoil/interfaces/IShl';

const ViewLink = (props: {data: IShl}) => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);
  return (
    <SafeAreaView style={globalStyle.fullyCentered}>
      <View style={styles.infoContainer}>
        <Text style={globalStyle.descriptionBlackL1}>
          {t('shl.viewing.published-date')}:
        </Text>
        <Text style={[globalStyle.descriptionBlackL1, styles.dates]}>
          {dayjs(props.data.creationDate).format(DATE_TIME_FORMAT)}
        </Text>
        <Text style={globalStyle.descriptionBlackL1}>
          {t('shl.viewing.expiration-date')}:
        </Text>
        <Text style={[globalStyle.descriptionBlackL1, styles.dates]}>
          {dayjs(props.data.expirationDate).format(DATE_TIME_FORMAT)}
        </Text>
        <View style={styles.actionButtonRow}>
          <Text style={globalStyle.descriptionBlackL1}>
            {t('shl.viewing.access-count')}:
          </Text>
          <Text style={[globalStyle.descriptionBlackL1, styles.dates]}>
            {props.data.accessCount}
          </Text>
        </View>
        <View style={styles.actionButtonRow}>
          <Text style={globalStyle.descriptionBlackL1}>
            {t('shl.viewing.failed-attempts')}:
          </Text>
          <Text style={[globalStyle.descriptionBlackL1, styles.dates]}>
            {props.data.failedAccessCount}
          </Text>
        </View>
      </View>

      <View>
        <QRCode
          value={props.data.shl}
          size={horizontalScale(230)}
          logo={require('../../../../assets/images/smart-logo.png')}
          logoSize={horizontalScale(30)}
        />
      </View>
      <Text style={[globalStyle.descriptionBlackL1, styles.pinContainer]}>
        {t('shl.viewing.pin')} {props.data.passcode}
      </Text>
      <View style={styles.actionButtonRow}>
        <TouchableOpacity
          style={[styles.actionButtonsSHL, globalStyle.fullyCentered]}
          onPress={() => {
            sendEmail(
              '',
              t('shl.viewing.emai-subject'),
              t('shl.viewing.email-body-partA') +
                props.data.shl +
                t('shl.viewing.email-body-partB') +
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
          <Text style={styles.actionButtonText}>{t('shl.viewing.share')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButtonsSHL, globalStyle.fullyCentered]}
          onPress={() => {
            copyToClipboard(
              props.data.shl,
              t('shl.viewing.copy-alert'),
              t('shl.viewing.copy-alert-continue'),
            );
          }}>
          <FontAwesomeIcon
            icon={faCopy}
            color="#FFFFFF"
            size={horizontalScale(18)}
          />
          <Text style={styles.actionButtonText}>{t('shl.viewing.copy')}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.actionButtonsSHL, globalStyle.fullyCentered]}
        onPress={() => {
          showAlertAndOpenURL(
            props.data.shl,
            t('shl.viewing.open-alert-title'),
            t('shl.viewing.open-alert-description'),
            t('shl.viewing.open-alert-cancel'),
            t('shl.viewing.open-alert-continue'),
          );
        }}>
        <FontAwesomeIcon
          icon={faUpRightFromSquare}
          color="#FFFFFF"
          size={horizontalScale(18)}
        />
        <Text style={styles.actionButtonText}>{t('shl.viewing.open')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ViewLink;
