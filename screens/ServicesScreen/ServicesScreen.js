import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  Image,
} from 'react-native';
import NavigationButton from '../../components/NavigationButton/NavigationButton';
import styles from './style';
import globalStyle from '../../assets/styles/globalStyle';
import {useTranslation} from 'react-i18next';
import i18n from '../../assets/translations/i18next';

const ServicesScreen = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ImageContainer} />
      <ScrollView style={globalStyle.marginTop60}>
        <NavigationButton
          type={'withIcon'}
          title={t('Doctors Registry')}
          image={require('../../assets/images/forNavigation/Doctor_registry.png')}
          onPress={() => {
            navigation.navigate('Alerts'); // TO BE IMPLEMENTED
          }}
        />
        <NavigationButton
          type={'withIcon'}
          title={t('Pharmacists Registry')}
          image={require('../../assets/images/forNavigation/Pharmacist_registry.png')}
          onPress={() => {
            navigation.navigate('Alerts'); // TO BE IMPLEMENTED
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServicesScreen;
