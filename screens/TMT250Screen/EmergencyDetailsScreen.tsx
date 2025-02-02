import React from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

const EmergencyDetailsScreen = ({ route }) => {
    const { emergencyDetails } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>Emergency Details</Text>
                <Text style={styles.infoText}>Device ID: {emergencyDetails.deviceId}</Text>
                <Text style={styles.infoText}>Timestamp: {emergencyDetails.timestamp}</Text>
                <Text style={styles.infoText}>
                    Location:
                    Latitude {emergencyDetails.location?.latitude},
                    Longitude {emergencyDetails.location?.longitude}
                </Text>
                <Text style={styles.infoText}>
                    Speed: {emergencyDetails.speed || 'N/A'} km/h
                </Text>
                <Text style={styles.infoText}>
                    Direction: {emergencyDetails.direction || 'N/A'}
                </Text>
                <Text style={styles.infoText}>
                    Battery Status: {emergencyDetails.batteryStatus || 'N/A'}
                </Text>
                <Text style={styles.infoText}>
                    Geofence Alert: {emergencyDetails.geofenceAlert || 'None'}
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    detailsContainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    infoText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 8,
    },
});

export default EmergencyDetailsScreen;
