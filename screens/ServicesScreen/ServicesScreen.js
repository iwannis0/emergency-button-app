import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import NavigationButton from '../../components/NavigationButton/NavigationButton';
import styles from './style';
import globalStyle from '../../assets/styles/globalStyle';
import {useTranslation} from 'react-i18next';

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
          bottomBorderStyle={globalStyle.bottomBorderL1}
          titleStyle={globalStyle.descriptionBlackL1}
        />
        <NavigationButton
          type={'withIcon'}
          title={t('Pharmacists Registry')}
          image={require('../../assets/images/forNavigation/Pharmacist_registry.png')}
          onPress={() => {
            navigation.navigate('Alerts'); // TO BE IMPLEMENTED
          }}
          bottomBorderStyle={globalStyle.bottomBorderL1}
          titleStyle={globalStyle.descriptionBlackL1}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServicesScreen;
