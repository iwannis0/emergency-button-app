import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import PropTypes from 'prop-types';
import data from '../../testing/dummydata/infocardDummy';
import ModalComponent from '../ModalComponent/ModalComponent';
import globalStyle from '../../assets/styles/globalStyle';

const InformationCard = props => {
  const [CHARACTER_LIMIT, setCHARACTER_LIMIT] = useState(27);

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const [row2Flag, setrow2Flag] = useState(true);
  const [riskFlag, setRiskFlag] = useState(true);
  const [statusFlag, setstatusFlag] = useState(true);
  const [onsetFlag, setonsetFlag] = useState(true);
  const [row1TopMargin, setrow1TopMargin] = useState(10);
  const [row3TopMargin, setrow3TopMargin] = useState(0);
  const [riskColor, setriskColor] = useState('#91D9A5');
  const [statusColor, setstatusColor] = useState('#76A66E');
  const [TopSubtext, setTopSubtext] = useState('');
  const [BottomSubtext, setBottomSubtext] = useState('');

  const fullTop = `${TopSubtext} ${props.TopSubtitle}`;
  const fullBottom = `${BottomSubtext} ${props.BottomSubtitle}`;
  {
    /* This effect is used to define the structure of the Card */
  }
  useEffect(() => {
    if (props.type === 'Medical') {
      setrow2Flag(false);
      setrow1TopMargin(20);
      setrow3TopMargin(10);
    } else if (
      props.type === 'Procedure' ||
      props.type === 'Travel' ||
      props.type === 'Social History'
    ) {
      setCHARACTER_LIMIT(40);
      setRiskFlag(false);
      setstatusFlag(false);
      setonsetFlag(false);
    } else {
    }
  }, [props.type]);

  {
    /* This effect is used to change the color of the Risk Box */
  }
  useEffect(() => {
    if (props.type !== 'Procedure') {
      if (props.risk === 'High Risk') {
        setriskColor('#FF9F9F');
      } else if (props.risk === 'Moderate') {
        setriskColor('#FFCC6A');
      }
    }
  }, [props.type, props.risk]);

  {
    /* This effect is used to change the color of the Status circle */
  }
  useEffect(() => {
    if (props.type === 'Allergy') {
      if (props.status === 'Inactive') {
        setstatusColor('red');
      }
    }
  }, [props.type, props.status]);

  {
    /* This effect is used to change the color of the Status circle */
  }
  useEffect(() => {
    if (props.type === 'Medical') {
      setBottomSubtext('Diagnoses Age:');
    } else if (props.type === 'Procedure') {
      setTopSubtext('Body Site:');
      setBottomSubtext('Procedure Date:');
    } else if (props.type === 'Device') {
      setTopSubtext('Onset Date:');
      setBottomSubtext('Removal Date:');
    } else if (props.type === 'Travel') {
      setTopSubtext('Arrival Date:');
      setBottomSubtext('Departure Date:');
    }
  }, [props.type]);

  return (
    <View style={styles.informationCardContainer}>
      <ModalComponent
        data={data}
        visibility={modalVisible}
        toggle={toggleModal}
        onClose={() => setModalVisible(false)}
        title={props.title}
      />

      <TouchableOpacity
        disabled={!props.hasModal}
        style={[styles.container, globalStyle.backgroundWhite]}
        onPress={() => toggleModal()}>
        {/* The first row includes the item of discussion and also if applicable its risk factor */}
        <View style={[globalStyle.row, {marginTop: row1TopMargin}]}>
          <Text numberOfLines={1} style={globalStyle.descriptionBlackL1}>
            {props.title.length < CHARACTER_LIMIT
              ? `${props.title}`
              : `${props.title.substring(0, CHARACTER_LIMIT)}...`}
          </Text>
          {riskFlag && (
            <View
              style={[
                styles.risk_Container,
                globalStyle.fullyCentered,
                {backgroundColor: riskColor},
              ]}>
              <Text style={styles.risk_Caption}>{props.risk}</Text>
            </View>
          )}
        </View>
        {/* The second row is only for the Allergy Information and describes the type of Allergy and status */}
        {row2Flag && (
          <View style={[globalStyle.row, styles.marginTop5]}>
            <Text numberOfLines={1} style={globalStyle.descriptionGrey}>
              {fullTop.length < CHARACTER_LIMIT
                ? `${fullTop}`
                : `${fullTop.substring(0, CHARACTER_LIMIT)}...`}
            </Text>
            {statusFlag && (
              <View style={styles.status_container}>
                <Text style={[styles.cirlce, {color: statusColor}]}>⬤</Text>
                <Text style={styles.caption}>{props.status}</Text>
              </View>
            )}
          </View>
        )}

        {/* The third row is an additional information and if applicable the onset date */}
        <View style={[globalStyle.row, {marginTop: row3TopMargin}]}>
          <Text numberOfLines={1} style={globalStyle.descriptionGrey}>
            {fullBottom.length < CHARACTER_LIMIT
              ? `${fullBottom}`
              : `${fullBottom.substring(0, CHARACTER_LIMIT)}...`}
          </Text>
          {onsetFlag && <Text style={styles.caption}>From {props.onset}</Text>}
        </View>
      </TouchableOpacity>
    </View>
  );
};

InformationCard.propTypes = {
  modaltext: PropTypes.string,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  hasModal: PropTypes.bool,
  TopSubtitle: PropTypes.string,
  BottomSubtitle: PropTypes.string,
  risk: PropTypes.string,
  status: PropTypes.string,
  onset: PropTypes.string,
};

InformationCard.defaultProps = {
  hasModal: true,
};

export default InformationCard;
