import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Alert, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import SendSMS from 'react-native-sms';

const EmergencyMessageButton = () => {
    const [location, setLocation] = useState(null);

    const requestPermissions = async () => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.SEND_SMS,
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                ]);

                if (
                    granted[PermissionsAndroid.PERMISSIONS.SEND_SMS] !== PermissionsAndroid.RESULTS.GRANTED ||
                    granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] !== PermissionsAndroid.RESULTS.GRANTED
                ) {
                    Alert.alert('Permission Denied', 'SMS or Location permission is required.');
                }
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const getLocationAndSendMessage = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
                sendEmergencyMessage(latitude, longitude);
            },
            (error) => Alert.alert('Location Error', error.message),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const sendEmergencyMessage = (latitude, longitude) => {
        const timestamp = new Date().toLocaleString();
        const emergencyMessage = `🚨 EMERGENCY 🚨\nHelp needed!\nTime: ${timestamp}\nLocation: https://maps.google.com/?q=${latitude},${longitude}`;

        SendSMS.send(
            {
                body: emergencyMessage,
                recipients: ['+35799900853'], // Change to actual emergency number
                successTypes: ['sent', 'queued'],
            },
            (completed, cancelled, error) => {
                if (completed) {
                    Alert.alert('Message Sent', 'Your emergency message was sent successfully.');
                } else if (cancelled) {
                    Alert.alert('Message Cancelled', 'Emergency message was not sent.');
                } else if (error) {
                    Alert.alert('Message Failed', 'An error occurred while sending the message.');
                }
            }
        );
    };

    useEffect(() => {
        requestPermissions();
    }, []);

    return (
        <View style={styles.container}>
            <Button title="EMERGENCY MESSAGE" color="red" onPress={getLocationAndSendMessage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        alignItems: 'center',
    },
});

export default EmergencyMessageButton;
