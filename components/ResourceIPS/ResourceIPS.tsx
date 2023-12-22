import React from 'react';
import styles from './styles';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import CheckBox from '@react-native-community/checkbox';
import {Text, TouchableOpacity, View} from 'react-native';

const ResourceIPS = props => {
  const {t} = useTranslation();

  const handleToggleCheckbox = () => {
    if (!props.selected) {
      props.addID();
    } else {
      props.removeID();
    }
  };

  const buttonStyle = props.selected
    ? [styles.button, {backgroundColor: 'rgba(17, 212, 40, 0.4)'}] // Combine styles if selected
    : styles.button;

  const renderText = (text: string) =>
    !props.phase && text !== t('no-data') && <Text>{text}</Text>;

  return (
    <TouchableOpacity style={buttonStyle} onPress={handleToggleCheckbox}>
      <View style={styles.container}>
        <View style={styles.checkBoxContainer}>
          <CheckBox disabled={true} value={props.selected} />
        </View>
        <View style={styles.resourceContainer}>
          <Text style={styles.typeText}>{props.type}</Text>
          <Text>{props.text1}</Text>
          {renderText(props.text2)}
          {renderText(props.text3)}
          {renderText(props.text4)}
        </View>
      </View>
    </TouchableOpacity>
  );
};

ResourceIPS.propTypes = {
  id: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  addID: PropTypes.func,
  removeID: PropTypes.func,
  type: PropTypes.string.isRequired,
  text1: PropTypes.string.isRequired,
  text2: PropTypes.string,
  text3: PropTypes.string,
  text4: PropTypes.string,
  phase: PropTypes.bool,
};

export default ResourceIPS;
