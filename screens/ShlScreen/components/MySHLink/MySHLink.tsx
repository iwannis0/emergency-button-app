import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import PropTypes from 'prop-types';
import globalStyle from '../../../../assets/styles/globalStyle';
import {} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';

const MySHLink = (props: any) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={[globalStyle.descriptionBlackL2, styles.containerText]}>
        {props.label}
      </Text>
      <TouchableOpacity style={styles.containerButton} onPress={props.viewLink}>
        <Text style={styles.containerButtonText}>Προβολή</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.containerButton} onPress={props.editLink}>
        <Text style={styles.containerButtonText}>Διαχείριση</Text>
      </TouchableOpacity>
    </View>
  );
};

MySHLink.propTypes = {
  label: PropTypes.string.isRequired,
  viewLink: PropTypes.func.isRequired,
  editLink: PropTypes.func.isRequired,
};

export default MySHLink;
