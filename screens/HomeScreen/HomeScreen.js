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
import {useRecoilState} from 'recoil';
import {userState} from '../../features/recoil/atoms/User/userState';

const MyHealthScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [user, setUser] = useRecoilState(userState);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ImageContainer}>
        <Pressable
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <Image
            tintColor={'#85CECA'}
            source={require('../../assets/images/Profile/default.png')}
            style={styles.ImageStyle}
          />
          <Text style={styles.ImageInitials}>
            {user && user.name ? user.name[0] : 'N'}
            {user && user.surname ? user.surname[0] : 'A'}
          </Text>
        </Pressable>
      </View>
      <ScrollView style={globalStyle.marginTop60}>
        <NavigationButton
          type={'withIcon'}
          title={t('Alerts')}
          image={require('../../assets/images/forNavigation/Alert.png')}
          onPress={() => {
            navigation.navigate('Alerts');
          }}
        />
        <NavigationButton
          type={'withIcon'}
          title={t('Medical History')}
          image={require('../../assets/images/forNavigation/Medical.png')}
          onPress={() => {
            navigation.navigate('Medical History');
          }}
        />
        <NavigationButton
          type={'withIcon'}
          title={t('Clinical Examination')}
          image={require('../../assets/images/forNavigation/Clinical.png')}
          onPress={() => {
            navigation.navigate('Clinical Examination');
          }}
        />
        <NavigationButton
          type={'withIcon'}
          title={t('Laboratory')}
          image={require('../../assets/images/forNavigation/Laboratory.png')}
          onPress={() => {
            navigation.navigate('Laboratory');
          }}
        />
        <NavigationButton
          type={'withIcon'}
          title={t('Imaging')}
          image={require('../../assets/images/forNavigation/Imaging.png')}
          onPress={() => {
            navigation.navigate('Imaging');
          }}
        />
        <NavigationButton
          type={'withIcon'}
          title={t('Episodes of Care and Visits')}
          image={require('../../assets/images/forNavigation/Episodes.png')}
          onPress={() => {
            navigation.navigate('Episodes of Care and Visits');
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyHealthScreen;
