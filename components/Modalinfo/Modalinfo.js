import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import styles2 from '../InformationCard/style';
import PropTypes from 'prop-types';
import globalStyle from '../../assets/styles/globalStyle';

const Modalinfo = props => {
  return (
    <View style={styles.container}>
      <Text style={[styles2.subtitle, styles.modalText]}>
        {props.placeholder}
      </Text>
      <Text style={[styles2.title, styles.modalText, {fontSize: 16}]}>
        {props.value}
      </Text>
    </View>
  );
};

Modalinfo.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Modalinfo;
