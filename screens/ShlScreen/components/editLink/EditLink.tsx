import React, {useEffect} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import {TextInput} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useDeleteLink} from '../../../../features/SHL/manageSHL';

const EditLink = props => {
  const {t} = useTranslation();
  const [label, setLabel] = React.useState(props.label);
  const [labelButtonDisapled, setlLabelButtonDisapled] = React.useState(true);
  const [passcode, setpasscode] = React.useState(props.passcode);
  const [passcodeButtonDisapled, setlPasscodeButtonDisapled] =
    React.useState(true);

  const showAlertToDeleteLink = useDeleteLink();
  const handleDelete = () => {
    showAlertToDeleteLink(
      props.id,
      'Delete SMART Health Link',
      'YOu will permanently delete your link',
      'Cancel',
      'Delete',
    );
  };

  useEffect(() => {
    if (props.label === label) {
      setlLabelButtonDisapled(true);
    } else {
      setlLabelButtonDisapled(false);
    }
  }, [label, props.label]);

  useEffect(() => {
    if (props.passcode === passcode) {
      setlPasscodeButtonDisapled(true);
    } else {
      setlPasscodeButtonDisapled(false);
    }
  }, [passcode, props.passcode]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.labels}>Name of Smart Health Link</Text>
      <TextInput style={styles.inputs} value={label} onChangeText={setLabel} />
      <TouchableOpacity
        disabled={labelButtonDisapled}
        style={[
          styles.updateButton,
          labelButtonDisapled && styles.disabledButton,
        ]}>
        <Text style={styles.updateButtonText}> Update Label</Text>
      </TouchableOpacity>

      <Text style={styles.labels}>Access Code</Text>
      <TextInput
        style={styles.inputs}
        value={passcode}
        onChangeText={setpasscode}
      />
      <TouchableOpacity
        disabled={passcodeButtonDisapled}
        style={[
          styles.updateButton,
          passcodeButtonDisapled && styles.disabledButton,
        ]}>
        <Text style={styles.updateButtonText}>Update Passcode</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.updateButton, styles.deleteButton]}
        onPress={handleDelete}>
        <Text style={styles.updateButtonText}>Delete SMART Health Link</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

EditLink.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  passcode: PropTypes.string.isRequired,
  expirationDate: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default EditLink;
