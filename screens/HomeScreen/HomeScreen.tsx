import React, { useState } from 'react';
import {
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import NavigationButton from '../../components/NavigationButton/NavigationButton';
import styles from './style';
import globalStyle from '../../assets/styles/globalStyle';
import {useTranslation} from 'react-i18next';
import {useRecoilState} from 'recoil';
import {userState} from '../../features/recoil/atoms/User/userState';
import EmergencyButton from '../../components/Emergencybutton/EmergencyButton'; // Import EmergencyButton
import EmergencyMessageButton from '../../components/Emergencybutton/EmergencyMessageButton';
import BluetoothComponent from "../../services/BluetoothComponent";
import SMScomponent from "../TMT250Screen/SMScomponent";
import BluetoothService from "../../services/BluetoothService";

// interface EmergencyDetails {
//     deviceId: string;
//     timestamp: string;
//     location: {
//         latitude: number | null;
//         longitude: number | null;
//     } | null;
//     speed: string | 'N/A';
//     direction: string | 'N/A';
//     batteryStatus: string | 'N/A';
//     geofenceAlert: string | 'None';
// }

const MyHealthScreen = ({navigation}) => {
    const {t} = useTranslation();
    const [user, _] = useRecoilState(userState);

    // //Handler for device connection and emergency details
    // const handleDeviceConnected = (emergencyDetails: EmergencyDetails) => {
    //     // Navigate to EmergencyDetailsScreen with the provided emergency details
    //     navigation.navigate('EmergencyDetailsScreen', { emergencyDetails });
    // };

    // const bluetoothService = new BluetoothService();
    // bluetoothService.requestPermissions().then(r => {
    //     bluetoothService.connect("TMT250_0014525_LE").then(r => {
    //         console.log("TEST");
    //     });
    //
    // });

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
                    titleStyle={globalStyle.descriptionBlackL1}
                />

                <EmergencyButton />
                <EmergencyMessageButton />
                <SMScomponent />
                {/* Bluetooth connection for TMT250 */}
                {/*<BluetoothComponent onDeviceConnected={handleDeviceConnected} />*/}
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
