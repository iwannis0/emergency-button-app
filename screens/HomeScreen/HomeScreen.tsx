import React, { useState, useEffect } from 'react';
import {
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigationButton from '../../components/NavigationButton/NavigationButton';
import styles from './style';
import globalStyle from '../../assets/styles/globalStyle';
import {useTranslation} from 'react-i18next';
import {useRecoilState} from 'recoil';
import {userState} from '../../features/recoil/atoms/User/userState';
import EmergencyButton from '../../components/Emergencybutton/EmergencyButton';
import EmergencyMessageButton from '../../components/Emergencybutton/EmergencyMessageButton';
import SMScomponent from "../TMT250Screen/SMScomponent";
import SMScomponent1 from "../TMT250Screen/SMScomponent1";
import SetNumberButton from "../../components/Emergencybutton/SetNumberButton";

const MyHealthScreen = ({navigation}) => {
    const {t} = useTranslation();
    const [user, _] = useRecoilState(userState);
    const [phoneNumber, setPhoneNumber] = useState("");

    // Load the saved phone number when the component mounts
    useEffect(() => {
        const loadPhoneNumber = async () => {
            const savedNumber = await AsyncStorage.getItem("emergencyPhoneNumber");
            if (savedNumber) {
                setPhoneNumber(savedNumber);
            }
        };
        loadPhoneNumber();
    }, []);

    // Function to update the phone number when the user sets a new one
    const updatePhoneNumber = async (newNumber) => {
        await AsyncStorage.setItem("emergencyPhoneNumber", newNumber);
        setPhoneNumber(newNumber); // Update the state immediately
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.ProfileContainer}>
                <Pressable
                    style={styles.ImageContainer}
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
                    title={t('patientSummary.alerts.title')}
                    image={require('../../assets/images/forNavigation/Alert.png')}
                    onPress={() => {
                        navigation.navigate('Alerts');
                    }}
                    bottomBorderStyle={globalStyle.bottomBorderL3}
                    titleStyle={globalStyle.descriptionBlackL1}
                />
                <NavigationButton
                    type={'withIcon'}
                    title={t('patientSummary.title')}
                    image={require('../../assets/images/forNavigation/Medical.png')}
                    onPress={() => {
                        navigation.navigate('Medical History');
                    }}
                    bottomBorderStyle={globalStyle.bottomBorderL3}
                    titleStyle={globalStyle.descriptionBlackL1}
                />
                <NavigationButton
                    type={'withIcon'}
                    title={t('patientSummary.clinical.title')}
                    image={require('../../assets/images/forNavigation/Clinical.png')}
                    onPress={() => {
                        navigation.navigate('Clinical Examination');
                    }}
                    bottomBorderStyle={globalStyle.bottomBorderL3}
                    titleStyle={globalStyle.descriptionBlackL1}
                />
                <NavigationButton
                    type={'withIcon'}
                    title={t('patientSummary.laboratory.title')}
                    image={require('../../assets/images/forNavigation/Laboratory.png')}
                    onPress={() => {
                        navigation.navigate('Laboratory');
                    }}
                    bottomBorderStyle={globalStyle.bottomBorderL3}
                    titleStyle={globalStyle.descriptionBlackL1}
                />
                <NavigationButton
                    type={'withIcon'}
                    title={t('patientSummary.imaging.title')}
                    image={require('../../assets/images/forNavigation/Imaging.png')}
                    onPress={() => {
                        navigation.navigate('Imaging');
                    }}
                    bottomBorderStyle={globalStyle.bottomBorderL3}
                    titleStyle={globalStyle.descriptionBlackL1}
                />
                <NavigationButton
                    type={'withIcon'}
                    title={t('patientSummary.episodes-care.title')}
                    image={require('../../assets/images/forNavigation/Episodes.png')}
                    onPress={() => {
                        navigation.navigate('Episodes of Care and Visits');
                    }}
                    bottomBorderStyle={globalStyle.bottomBorderL3}
                    titleStyle={globalStyle.descriptionBlackL1}
                />
                <NavigationButton
                    type={'withIcon'}
                    title={'View SMS Messages'}
                    image={require('../../assets/images/forNavigation/history-of-calls.png')}
                    onPress={() => {
                        console.log("Navigating to SMS History...");
                        navigation.navigate('SMSHistory');
                    }}
                    bottomBorderStyle={globalStyle.bottomBorderL3}
                    titleStyle={globalStyle.descriptionBlackL1}
                />
                <NavigationButton
                    type={'withIcon'}
                    title={'View Medical ID'}
                    image={require('../../assets/images/forNavigation/medical_id.png')}
                    onPress={() => {
                        console.log("Navigating to Medical ID...");
                        navigation.navigate('MedicalID');
                    }}
                    bottomBorderStyle={globalStyle.bottomBorderL3}
                    titleStyle={globalStyle.descriptionBlackL1}
                />


                <EmergencyButton phoneNumber={phoneNumber} />
                <EmergencyMessageButton phoneNumber={phoneNumber}/>
                <SMScomponent />
                <SMScomponent1 />
                <SetNumberButton onNumberSet={updatePhoneNumber} />
            </ScrollView>

            <View style={globalStyle.fullyCentered}>
                <TouchableOpacity
                    style={[globalStyle.Button]}
                    onPress={() => {
                        navigation.navigate('ShlScreen');
                    }}>
                    <Text style={globalStyle.buttonText}>Smart Health Links</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default MyHealthScreen;
