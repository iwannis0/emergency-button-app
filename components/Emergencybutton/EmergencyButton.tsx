import React, { useEffect } from "react";
import { View, Button, StyleSheet, Alert, PermissionsAndroid, Platform } from "react-native";
import ImmediatePhoneCall from "react-native-immediate-phone-call";

interface EmergencyButtonProps {
    phoneNumber: string;
}

const EmergencyButton = ({ phoneNumber }: EmergencyButtonProps) => {
    const requestCallPermission = async () => {
        if (Platform.OS === "android") {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CALL_PHONE,
                    {
                        title: "Call Permission",
                        message: "This app needs access to make phone calls for emergency purposes.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK",
                    }
                );

                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    Alert.alert("Permission Denied", "❌ Cannot make phone calls without permission.");
                }
            } catch (err) {
                console.warn("⚠️ Permission error:", err);
            }
        }
    };

    const makeEmergencyCall = () => {
        if (phoneNumber) {
            console.log(`📞 Calling: ${phoneNumber}`);
            ImmediatePhoneCall.immediatePhoneCall(phoneNumber);
        } else {
            Alert.alert("No Emergency Number", "⚠️ Please set an emergency number first.");
        }
    };

    useEffect(() => {
        requestCallPermission();
    }, []);

    return (
        <View style={styles.container}>
            <Button title="Emergency Call" color="red" onPress={makeEmergencyCall} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        alignItems: "center",
    },
});

export default EmergencyButton;
