import React, { useEffect, useState } from "react";
import { View, Text, PermissionsAndroid, Alert, StyleSheet, ScrollView } from "react-native";
import SmsListener from "react-native-android-sms-listener";
import MapView, { Marker } from "react-native-maps";
import { Linking } from "react-native";

// Import SendIntentAndroid for handling SMS intents
const SendIntentAndroid = require('react-native-send-intent');

const SMScomponent1 = () => {
    // State to store received SMS message
    const [message, setMessage] = useState(null);
    // State to store extracted GPS coordinates
    const [location, setLocation] = useState(null);
    // State to store which emergency button was pressed
    const [buttonPressed, setButtonPressed] = useState(null);

    // Function to request necessary permissions
    const requestPermissions = async () => {
        try {
            // Request multiple permissions for SMS and location access
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
                PermissionsAndroid.PERMISSIONS.READ_SMS,
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.SEND_SMS,
            ]);

            // Check if all permissions are granted
            if (
                granted["android.permission.RECEIVE_SMS"] !== PermissionsAndroid.RESULTS.GRANTED ||
                granted["android.permission.READ_SMS"] !== PermissionsAndroid.RESULTS.GRANTED ||
                granted["android.permission.ACCESS_FINE_LOCATION"] !== PermissionsAndroid.RESULTS.GRANTED ||
                granted["android.permission.SEND_SMS"] !== PermissionsAndroid.RESULTS.GRANTED
            ) {
                Alert.alert("Permissions Denied", "SMS and Location permissions are required.");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    useEffect(() => {
        requestPermissions(); // Request permissions on component mount

        // Start listening for SMS messages
        const subscription = SmsListener.addListener((message) => {
            console.log("📩 Received SMS: ", message.body);

            // Process only SMS messages from GH5200 device
            if (!message.body.includes("GH5200")) {
                console.log("❌ Ignoring SMS - Not from GH5200");
                return;
            }

            let detectedButton = "Unknown";

            // Identify which emergency button was pressed based on message content
            if (message.body.includes("Alarm Button")) {
                detectedButton = "🚨 Alarm Button Pressed";
            } else if (message.body.includes("Amber Alert")) {
                detectedButton = "🔶 Button 1 (Amber Alert)";
            } else if (message.body.includes("ManDown")) {
                detectedButton = "⚠️ Button 2 (Man-Down)";
            } else if (message.body.includes("Button 3")) {
                detectedButton = "📞 Button 3 (Call)";
            }

            setButtonPressed(detectedButton); // Store detected button

            // Extract GPS coordinates from message using regex pattern
            const locationMatch = message.body.match(/Lon:([-?\d.]+) Lat:([-?\d.]+)/);

            if (locationMatch) {
                const lat = parseFloat(locationMatch[2]); // Extract latitude
                const lon = parseFloat(locationMatch[1]); // Extract longitude
                setLocation({ latitude: lat, longitude: lon });
            }

            setMessage(message.body); // Store full message content
        });

        // Cleanup subscription on unmount
        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>🚨GH5200 Emergency Alert🚨</Text>

            {/* Display last received SMS message */}
            <View style={styles.infoBox}>
                <Text style={styles.label}>📩 Last SMS:</Text>
                <Text style={styles.text}>{message || "Waiting for SMS..."}</Text>
            </View>

            {/* Display the detected button press */}
            <View style={styles.infoBox}>
                <Text style={styles.label}>🔘 Button Pressed:</Text>
                <Text style={styles.text}>{buttonPressed || "N/A"}</Text>
            </View>

            {/* Display emergency location on a map if available */}
            {location && (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker
                        coordinate={location}
                        title="Emergency Location"
                        description="Tap for directions"
                        onPress={() => {
                            const url = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;
                            Linking.openURL(url).catch(err =>
                                Alert.alert("Error", "Unable to open Google Maps.")
                            );
                        }}
                    />
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

export default SMScomponent1;
