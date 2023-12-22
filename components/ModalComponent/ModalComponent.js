//Basics
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

// Styles
import styles from './style';
import globalStyle from '../../assets/styles/globalStyle';

const ModalComponent = props => {
  return (
    <Modal
      visible={props.visibility}
      animationType="fade"
      transparent={true}
      onRequestClose={props.onClose}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={100}
        style={styles.container}>
        <View style={[styles.modalView, globalStyle.backgroundWhite]}>
          <View style={[globalStyle.row, styles.modaltitle]}>
            <Text style={[globalStyle.descriptionBlackL1, {fontWeight: 600}]}>
              {props.title}
            </Text>
            <TouchableOpacity onPress={props.onClose}>
              <Image
                source={require('../../assets/images/forNavigation/close.png')}
                style={{width: 15, height: 15, tintColor: '#777777'}}
              />
            </TouchableOpacity>
          </View>
          {props.children}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

ModalComponent.propTypes = {
  title: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};
export default ModalComponent;
