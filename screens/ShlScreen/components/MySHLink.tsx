import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import styles from './MyStyles';
import globalStyle from '../../../assets/styles/globalStyle';
import {} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import {IShl} from '../../../features/recoil/interfaces/IShl';
import {deleteLink} from '../api/deleteLink';
import {useRecoilState} from 'recoil';
import {userState} from '../../../features/recoil/atoms/User/userState';
import {shlHistoryState} from '../../../features/recoil/atoms/ShlHistory/shlHistoryState';

const MySHLink = (props: {data: IShl}) => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);
  const [shlHistory, setShlHistory] = useRecoilState(shlHistoryState);

  const DeleteProcess = async () => {
    await deleteLink(props.data.shl, user.token)
      .then(response => {
        console.log('response', response);
        if (response.isSuccess) {
          const updatedLinks = shlHistory.shLinks.filter(
            link => link.shl !== props.data.shl,
          );
          setShlHistory({...shlHistory, shLinks: updatedLinks});
          Alert.alert('Success', 'SHL deleted successfully');
        } else {
          Alert.alert('Error', 'Something went wrong');
        }
      })
      .catch(error => {
        Alert.alert('Error', 'Something went wrong');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={[globalStyle.descriptionBlackL2, styles.containerText]}>
        {props.data.label}
      </Text>
      <TouchableOpacity style={styles.containerButton}>
        <Text style={styles.containerButtonText}>View</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.containerButton, styles.deleteButtonColor]}
        onPress={() => {
          Alert.alert(
            'Delete',
            'Are you sure you want to delete this SHL?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },

              {text: 'OK', onPress: () => DeleteProcess()},
            ],
            {cancelable: false},
          );
        }}>
        <Text style={styles.containerButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MySHLink;
