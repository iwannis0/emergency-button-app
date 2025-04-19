import { useEffect } from "react";
import { PermissionsAndroid, Alert } from "react-native";
import SmsAndroid from "react-native-android-sms-listener";
import { createSMSTable, saveSMS } from "./DatabaseHelper";

const SMSListener = () => {
    useEffect(() => {
        requestSMSPermission();
        createSMSTable();

        const subscription = SmsAndroid.addListener((message) => {
            console.log("📩 Received SMS:", message.body);

            saveSMS({
                sender: message.originatingAddress,
                message: message.body,
            });

            Alert.alert("New Emergency SMS Received!");
        });

        return () => {
            if (subscription) subscription.remove();
        };
    }, []);

    const requestSMSPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECEIVE_SMS);
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert("SMS Permission Denied", "You need to allow SMS access to store messages.");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    return null; // No UI required
};

export default SMSListener;
