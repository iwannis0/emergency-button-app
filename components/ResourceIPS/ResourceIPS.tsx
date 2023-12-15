import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import CheckBox from '@react-native-community/checkbox';
import {useTranslation} from 'react-i18next';

const ResourceIPS = props => {
  const {t} = useTranslation();
  const handleToggleCheckbox = () => {
    props.onToggle(!props.selected);
  };

  const buttonStyle = props.selected
    ? [styles.button, {backgroundColor: 'rgba(17, 212, 40, 0.4)'}] // Combine styles if selected
    : styles.button;

  return (
    <TouchableOpacity style={buttonStyle} onPress={handleToggleCheckbox}>
      <View style={styles.container}>
        <View style={styles.checkBoxContainer}>
          <CheckBox disabled={true} value={props.selected} />
        </View>
        <View style={styles.resourceContainer}>
          <Text style={styles.typeText}>{props.type}</Text>
          <Text>{props.text1}</Text>
          {props.text2 !== t('no-data') && <Text>{props.text2}</Text>}
          {props.text3 !== t('no-data') && <Text>{props.text3}</Text>}
          {props.text4 !== t('no-data') && <Text>{props.text4}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

ResourceIPS.propTypes = {
  id: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  text1: PropTypes.string.isRequired,
  text2: PropTypes.string,
  text3: PropTypes.string,
  text4: PropTypes.string,
};

export default ResourceIPS;
