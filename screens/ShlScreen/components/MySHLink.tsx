import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import styles from './MyStyles';
import globalStyle from '../../../assets/styles/globalStyle';
import {useTranslation} from 'react-i18next';
import {IShl} from '../../../features/recoil/interfaces/IShl';
import {deleteLink} from '../api/deleteLink';
import {useRecoilState} from 'recoil';
import {userState} from '../../../features/recoil/atoms/User/userState';
import {shlHistoryState} from '../../../features/recoil/atoms/ShlHistory/shlHistoryState';
import ViewLink from './ViewLink/ViewLink';
import {SafeAreaView} from 'react-native-safe-area-context';
import ModalComponent from '../../../components/ModalComponent/ModalComponent';

const MySHLink = (props: {data: IShl}) => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);
  const [shlHistory, setShlHistory] = useRecoilState(shlHistoryState);
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleDeleteShl = async () => {
    return await deleteLink(props.data.shl, user.token)
      .then(response => {
        if (!response) throw new Error('Error');

        const updatedLinks = shlHistory.shLinks.filter(
          link => link.shl !== props.data.shl,
        );
        setShlHistory({...shlHistory, shLinks: updatedLinks});
        Alert.alert('Success', 'SHL deleted successfully');
      })
      .catch(error => {
        console.log('error', error);
        Alert.alert('Error', 'Something went wrong');
      });
  };

  return (
    <SafeAreaView>
      {modalVisible && (
        <ModalComponent
          title={''}
          visibility={modalVisible}
          onClose={() => {
            setModalVisible(false);
          }}>
          <View>
            <ViewLink data={props.data} />
          </View>
        </ModalComponent>
      )}

      <View style={styles.container}>
        <Text style={[globalStyle.descriptionBlackL2, styles.containerText]}>
          {props.data.label}
        </Text>
        <TouchableOpacity
          style={styles.containerButton}
          onPress={() => setModalVisible(true)}>
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

                {text: 'OK', onPress: () => handleDeleteShl()},
              ],
              {cancelable: false},
            );
          }}>
          <Text style={styles.containerButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MySHLink;
