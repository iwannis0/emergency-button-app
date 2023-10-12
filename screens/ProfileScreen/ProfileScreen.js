import React, {useState} from 'react';
import {View, Text, Image, ScrollView, SafeAreaView} from 'react-native';
import globalStyle from '../../assets/styles/globalStyle';
import NavigationButton from '../../components/NavigationButton/NavigationButton';
import styles from './style';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import data from '../../testing/dummydata/infocardDummy';
import {useTranslation} from 'react-i18next';

const ProfileScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [modaldata, setModalData] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalData(data);
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, {flex: 1}]}>
      <View style={globalStyle.marginTop60}>
        <View style={styles.ProfileContainer}>
          <View style={styles.ImageContainer}>
            <Image
              tintColor={'#85CECA'}
              source={require('../../assets/images/Profile/default.png')}
              style={styles.ImageStyle}
            />
            <Text style={styles.ImageInitials}>SV</Text>
          </View>
          <Text style={[globalStyle.descriptionBlack, styles.Name]}>
            Stavri Charilaou
          </Text>
        </View>

        <ScrollView style={styles.ButtonContainer}>
          <ModalComponent
            data={modaldata}
            visibility={modalVisible}
            toggle={toggleModal}
          />
          <NavigationButton
            type={'withArrow'}
            title={t('Personal Information')}
            borderwidth={0}
            onPress={() => {
              toggleModal();
            }}
          />
          <NavigationButton
            type={'withArrow'}
            title={t('Contact Information')}
            onPress={() => {
              toggleModal();
            }}
          />
          <NavigationButton
            type={'withArrow'}
            title={t('Emergency Contact')}
            onPress={() => {
              toggleModal();
            }}
          />
          <NavigationButton
            type={'withArrow'}
            title={t('General Practitioner')}
            onPress={() => {
              toggleModal();
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
