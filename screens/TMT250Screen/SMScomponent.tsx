import React, { useEffect, useState } from "react";
import { View, Text, PermissionsAndroid, Alert, StyleSheet, ScrollView } from "react-native";
import SmsListener from "react-native-android-sms-listener";
import MapView, { Marker } from "react-native-maps";

const SMScomponent = () => {
    // State to store the last received SMS message
    const [message, setMessage] = useState<string | null>(null);
    // State to store extracted GPS coordinates from SMS
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

    // Function to request necessary permissions for SMS and location
    const requestPermissions = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
                PermissionsAndroid.PERMISSIONS.READ_SMS,
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            ]);

            // Check if all required permissions are granted
            if (
                granted["android.permission.RECEIVE_SMS"] !== PermissionsAndroid.RESULTS.GRANTED ||
                granted["android.permission.READ_SMS"] !== PermissionsAndroid.RESULTS.GRANTED ||
                granted["android.permission.ACCESS_FINE_LOCATION"] !== PermissionsAndroid.RESULTS.GRANTED
            ) {
                Alert.alert("Permissions Denied", "SMS and Location permissions are required.");
            } else {
                console.log("✅ All permissions granted!");
            }
        } catch (err) {
            console.warn("Permission error:", err);
        }
    };

    useEffect(() => {
        requestPermissions(); // Request permissions when component mounts

        // Start listening for incoming SMS messages
        const subscription = SmsListener.addListener((message) => {
            console.log("📩 Received SMS: ", message.body);

            // Ignore SMS messages from GH5200 devices
            if (message.body.includes("GH5200")) {
                console.log("❌ Ignored SMS from GH5200.");
                return;
            }

            try {
                // Extract GPS coordinates from SMS content
                const locationMatch = message.body.match(/Lon:([-?\d.]+) Lat:([-?\d.]+)/);

                if (locationMatch) {
                    setLocation({
                        latitude: parseFloat(locationMatch[2]) || 0, // Ensure valid latitude
                        longitude: parseFloat(locationMatch[1]) || 0, // Ensure valid longitude
                    });
                } else {
                    console.warn("⚠️ No valid location found in SMS!");
                }

                setMessage(message.body); // Store full message content
            } catch (error) {
                console.error("❌ Error processing SMS:", error);
            }
        });

        // Cleanup subscription on unmount
        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>🚨TMT250 Emergency Alert🚨</Text>

            {/* Display last received SMS message */}
            <View style={styles.infoBox}>
                <Text style={styles.label}>📩 Last SMS:</Text>
                <Text style={styles.text}>{message || "Waiting for SMS..."}</Text>
            </View>

            {/* Display emergency location on a map if available */}
            {location && (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location?.latitude || 0,
                        longitude: location?.longitude || 0,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker coordinate={location} title="Emergency Location" />
                </MapView>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        alignItems: "center",
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        color: "red",
        marginBottom: 10,
    },
    infoBox: {
        width: "100%",
        padding: 15,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: "#f9f9f9",
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
    },
    text: {
        fontSize: 16,
        color: "#333",
    },
    map: {
        width: "100%",
        height: 300,
        marginTop: 20,
    },
});

export default SMScomponent;
