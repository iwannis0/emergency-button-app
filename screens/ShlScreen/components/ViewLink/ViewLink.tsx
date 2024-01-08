import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import globalStyle from '../../../../assets/styles/globalStyle';
import QRCode from 'react-native-qrcode-svg';
import {useTranslation} from 'react-i18next';
import {
  horizontalScale,
  verticalScale,
} from '../../../../assets/styles/scaling';
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
  faArrowRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import dayjs from 'dayjs';
import {DATE_TIME_FORMAT} from '../../../../common/constants/constants';
import styles from './styles';
import {IShl} from '../../../../features/recoil/interfaces/IShl';

// TODO: Infos put on show more details
// TODO: More visible, less background
// TODO: Make copy with a small feedback not a big alert
// TODO: Put instructions for the user
const ViewLink = (props: {data: IShl}) => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);
  const [flipped, setFlipped] = useState(false);
  const VIEWER_LINK = 'https://ehr.local:3443/shlink:/';
  let LINK = VIEWER_LINK + props.data.shl;

  const flipAnimation = useState(new Animated.Value(0))[0];
  let flipRotation = 0;

  flipAnimation.addListener(({value}) => {
    flipRotation = value;
  });

  // const frontAnimatedStyle = {
  //   opacity: flipAnimation.interpolate({
  //     inputRange: [0, 90, 180],
  //     outputRange: [1, 0, 0],
  //   }),
  //   transform: [
  //     {
  //       rotateY: flipAnimation.interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['0deg', '180deg'],
  //       }),
  //     },
  //   ],
  // };

  // const backAnimatedStyle = {
  //   zindex: 2,
  //   opacity: flipAnimation.interpolate({
  //     inputRange: [0, 90, 180],
  //     outputRange: [0, 0, 1],
  //   }),
  //   transform: [
  //     {
  //       rotateY: flipAnimation.interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['180deg', '360deg'],
  //       }),
  //     },
  //   ],
  // };

  // const flipCard = () => {
  //   if (flipRotation >= 90) {
  //     setFlipped(false);
  //     Animated.spring(flipAnimation, {
  //       toValue: 0,
  //       friction: 8,
  //       tension: 10,
  //       useNativeDriver: true,
  //     }).start();
  //   } else {
  //     setFlipped(true);
  //     Animated.spring(flipAnimation, {
  //       toValue: 180,
  //       friction: 8,
  //       tension: 10,
  //       useNativeDriver: true,
  //     }).start();
  //   }
  // };

  const flipCard = () => {
    let toValue = flipped ? 0 : 180;
    setFlipped(!flipped);
    Animated.spring(flipAnimation, {
      toValue: toValue,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };

  // Optimizing style calculation with useMemo
  const frontAnimatedStyle = useMemo(
    () => ({
      opacity: flipAnimation.interpolate({
        inputRange: [0, 90, 180],
        outputRange: [1, 0, 0],
      }),
      transform: [
        {
          rotateY: flipAnimation.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
          }),
        },
      ],
    }),
    [flipAnimation],
  );

  const backAnimatedStyle = useMemo(
    () => ({
      opacity: flipAnimation.interpolate({
        inputRange: [0, 90, 180],
        outputRange: [0, 0, 1],
      }),
      transform: [
        {
          rotateY: flipAnimation.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg'],
          }),
        },
      ],
    }),
    [flipAnimation],
  );
  return (
    <SafeAreaView style={globalStyle.fullyCentered}>
      <Animated.View style={[globalStyle.fullyCentered, frontAnimatedStyle]}>
        <View>
          <QRCode
            value={LINK}
            size={verticalScale(280)}
            logo={require('../../../../assets/images/smart-logo.png')}
            logoSize={verticalScale(50)}
          />
        </View>
        <Text style={styles.accessText}>{t('shl.viewing.pin')}</Text>
        <Text style={styles.pinText}>
          {' '}
          {props.data.passcode !== 'Unknown'
            ? props.data.passcode
            : t('shl.viewing.unknown-pin')}
        </Text>

        <View style={styles.actionButtonRow}>
          <View style={globalStyle.fullyCentered}>
            <TouchableOpacity
              disabled={flipped}
              style={[
                globalStyle.Button,
                styles.actionButtonsSHL,
                globalStyle.fullyCentered,
              ]}
              onPress={() => {
                sendEmail(
                  '',
                  t('shl.viewing.emai-subject'),
                  t('shl.viewing.email-body-partA') +
                    LINK +
                    t('shl.viewing.email-body-partB') +
                    user.surname +
                    ' ' +
                    user.name,
                );
              }}>
              <FontAwesomeIcon
                icon={faShareNodes}
                color="#f5f5f5"
                size={horizontalScale(25)}
              />
            </TouchableOpacity>
            <Text
              style={[globalStyle.descriptionBlackL1, styles.actionButtotText]}>
              {t('shl.viewing.share')}
            </Text>
          </View>

          <View style={globalStyle.fullyCentered}>
            <TouchableOpacity
              disabled={flipped}
              style={[
                globalStyle.Button,
                styles.actionButtonsSHL,
                globalStyle.fullyCentered,
              ]}
              onPress={() => {
                copyToClipboard(
                  LINK,
                  t('shl.viewing.copy-alert'),
                  t('shl.viewing.copy-alert-continue'),
                );
              }}>
              <FontAwesomeIcon
                icon={faCopy}
                color="#f5f5f5"
                size={horizontalScale(22)}
              />
            </TouchableOpacity>
            <Text
              style={[globalStyle.descriptionBlackL1, styles.actionButtotText]}>
              {t('shl.viewing.copy')}
            </Text>
          </View>

          <View style={globalStyle.fullyCentered}>
            <TouchableOpacity
              disabled={flipped}
              style={[
                globalStyle.Button,
                styles.actionButtonsSHL,
                globalStyle.fullyCentered,
              ]}
              onPress={() => {
                showAlertAndOpenURL(
                  LINK,
                  t('shl.viewing.open-alert-title'),
                  t('shl.viewing.open-alert-description'),
                  t('shl.viewing.open-alert-cancel'),
                  t('shl.viewing.open-alert-continue'),
                );
              }}>
              <FontAwesomeIcon
                icon={faUpRightFromSquare}
                color="#f5f5f5"
                size={horizontalScale(22)}
              />
            </TouchableOpacity>
            <Text
              style={[globalStyle.descriptionBlackL1, styles.actionButtotText]}>
              {t('shl.viewing.open')}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          disabled={flipped}
          style={styles.flipButton}
          onPress={() => flipCard()}>
          <Text style={globalStyle.descriptionBlackL1}>
            {t('shl.viewing.more-info')}
            {'   '}
          </Text>
          <FontAwesomeIcon
            icon={faArrowRight}
            color="#414141"
            size={horizontalScale(20)}
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[
          {
            position: 'absolute',
          },
          backAnimatedStyle,
        ]}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            {t('shl.viewing.published-date')}:
          </Text>
          <Text style={[globalStyle.descriptionBlackL1, styles.dates]}>
            {
              '1. Present the QR code to the person you want to share the link\n2. Let them scan the QR code with the camera of their smartphone\n3. They will be redirected to our website to view your resources\n4. Share the Access Code with them to allow them to access the resources'
            }
          </Text>
          <Text style={styles.infoText}>
            {t('shl.viewing.published-date')}:
          </Text>
          <Text style={[globalStyle.descriptionBlackL1, styles.dates]}>
            {dayjs(props.data.creationDate).format(DATE_TIME_FORMAT)}
          </Text>
          <Text style={styles.infoText}>
            {t('shl.viewing.expiration-date')}:
          </Text>
          <Text style={[globalStyle.descriptionBlackL1, styles.dates]}>
            {dayjs(props.data.expirationDate).format(DATE_TIME_FORMAT)}
          </Text>
          <View style={styles.actionButtonRow}>
            <Text style={styles.infoText}>
              {t('shl.viewing.access-count')}:
            </Text>
            <Text style={[globalStyle.descriptionBlackL1, styles.dates]}>
              {props.data.accessCount}
            </Text>
          </View>
          <View style={styles.actionButtonRow}>
            <Text style={styles.infoText}>
              {t('shl.viewing.failed-attempts')}:
            </Text>
            <Text style={[globalStyle.descriptionBlackL1, styles.dates]}>
              {props.data.failedAccessCount}
            </Text>
          </View>
          {flipped && (
            <TouchableOpacity
              disabled={!flipped}
              style={styles.flipButton}
              onPress={() => flipCard()}>
              <FontAwesomeIcon
                icon={faArrowLeft}
                color="#414141"
                size={horizontalScale(20)}
              />
              <Text style={globalStyle.descriptionBlackL1}>{'   '}Back</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default ViewLink;
