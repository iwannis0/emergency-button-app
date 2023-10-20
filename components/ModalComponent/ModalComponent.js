import React from 'react';
import {FlatList, Modal, Text, TouchableOpacity, View} from 'react-native';
import Modalinfo from '../Modalinfo/Modalinfo';
import PropTypes from 'prop-types';
import styles from './style';
import globalStyle from '../../assets/styles/globalStyle';

const ModalComponent = props => {
  return (
    <Modal visible={props.visibility} animationType="fade" transparent={true}>
      <View style={[styles.centeredView, globalStyle.fullyCentered]}>
        <View style={[styles.modalView, globalStyle.backgroundWhite]}>
          <View style={[globalStyle.row, styles.modaltitle]}>
            <Text style={[globalStyle.descriptionBlackL1, {fontWeight: 600}]}>
              Allergy
            </Text>
            <TouchableOpacity onPress={props.toggle}>
              <Text>X</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={styles.modalInformation}
            data={props.data}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <Modalinfo placeholder={item.onset} value={item.title} />
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

ModalComponent.propTypes = {
  data: PropTypes.array.isRequired,
  visibility: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};
export default ModalComponent;
