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

const MyHealthScreen = ({navigation}) => {
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
          <Text style={styles.ImageInitials}>SV</Text>
        </Pressable>
      </View>
      <ScrollView style={globalStyle.marginTop60}>
        <NavigationButton
          type={'withIcon'}
          title="Alerts"
          image={require('../../assets/images/forNavigation/Alert.png')}
          onPress={() => {
            navigation.navigate('Alerts');
          }}
        />
        <NavigationButton
          type={'withIcon'}
          title="Medical History"
          image={require('../../assets/images/forNavigation/Medical.png')}
          onPress={() => {
            navigation.navigate('Medical');
          }}
        />
        <NavigationButton
          type={'withIcon'}
          title="Clinical Examination"
          image={require('../../assets/images/forNavigation/Clinical.png')}
          onPress={() => {
            navigation.navigate('Clinical');
          }}
        />
        <NavigationButton
          type={'withIcon'}
          title="Laboratory"
          image={require('../../assets/images/forNavigation/Laboratory.png')}
          onPress={() => {
            navigation.navigate('Laboratory');
          }}
        />
        <NavigationButton
          type={'withIcon'}
          title="Imaging"
          image={require('../../assets/images/forNavigation/Imaging.png')}
          onPress={() => {
            navigation.navigate('Imaging');
          }}
        />
        <NavigationButton
          type={'withIcon'}
          title="Episodes of Care and Visits"
          image={require('../../assets/images/forNavigation/Episodes.png')}
          onPress={() => {
            navigation.navigate('Episodes');
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyHealthScreen;
