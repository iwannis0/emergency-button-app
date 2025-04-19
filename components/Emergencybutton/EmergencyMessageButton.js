import React, { useState, useEffect } from "react";
import {
    View,
    Button,
    StyleSheet,
    Alert,
    PermissionsAndroid,
    Platform,
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocation from "@react-native-community/geolocation";
import SendSMS from "react-native-sms";

const emergencyTypes = [
    { id: "fire", label: "🔥 Φωτιά" },
    { id: "flood", label: "🌊 Πλημμύρα" },
    { id: "earthquake", label: "🌍 Σεισμός" },
    { id: "injury", label: "🤕 Τραυματισμός" },
    { id: "threat", label: "⚠️ Απειλή" },
];

const severityLevels = [
    "Πολύ χαμηλή",
    "Χαμηλή",
    "Μέτρια",
    "Υψηλή",
    "Πολύ υψηλή",
    "Κρίσιμη",
];

const EmergencyMessageButton = ({ phoneNumber }) => {
    const [location, setLocation] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedType, setSelectedType] = useState(null);
    const [severity, setSeverity] = useState(null);
    const selectedColor = "#ffcc00"; // Highlight color for selection

    useEffect(() => {
        requestPermissions();
    }, []);

    // Request necessary permissions
    const requestPermissions = async () => {
        try {
            if (Platform.OS === "android") {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.SEND_SMS,
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                ]);

                if (
                    granted[PermissionsAndroid.PERMISSIONS.SEND_SMS] !== PermissionsAndroid.RESULTS.GRANTED ||
                    granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] !== PermissionsAndroid.RESULTS.GRANTED
                ) {
                    Alert.alert("❌ Άρνηση Άδειας", "Η εφαρμογή απαιτεί άδεια για SMS και τοποθεσία.");
                }
            }
        } catch (err) {
            console.warn("⚠️ Σφάλμα Άδειας:", err);
        }
    };

    // Get user location and send emergency SMS
    const getLocationAndSendMessage = () => {
        if (!selectedType || severity === null) {
            Alert.alert("⚠️ Επιλογή Υποχρεωτική", "Πρέπει να επιλέξεις περιστατικό και σοβαρότητα.");
            return;
        }

        if (!phoneNumber) {
            Alert.alert("⚠️ Δεν έχει οριστεί αριθμός", "Παρακαλώ ορίστε αριθμό πριν στείλετε μήνυμα.");
            return;
        }

        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });

                const timestamp = new Date().toLocaleString();
                const severityText = severityLevels[severity];

                const emergencyMessage = `🚨 ΕΠΕΙΓΟΝ ΠΕΡΙΣΤΑΤΙΚΟ 🚨
📍 Τύπος: ${selectedType.label}
🔥 Σοβαρότητα: ${severityText}
🕒 Ώρα: ${timestamp}
📍 Τοποθεσία: https://maps.google.com/?q=${latitude},${longitude}`;

                SendSMS.send(
                    {
                        body: emergencyMessage,
                        recipients: [phoneNumber],
                        successTypes: ["sent", "queued"],
                    },
                    (completed, cancelled, error) => {
                        if (completed) {
                            Alert.alert("✅ Μήνυμα στάλθηκε", "Το μήνυμα έκτακτης ανάγκης στάλθηκε επιτυχώς.");
                        } else if (cancelled) {
                            Alert.alert("❌ Μήνυμα ακυρώθηκε", "Το μήνυμα δεν στάλθηκε.");
                        } else if (error) {
                            Alert.alert("⚠️ Αποτυχία αποστολής", "Πρόβλημα κατά την αποστολή του μηνύματος.");
                        }
                    }
                );

                setModalVisible(false);
                setSelectedType(null);
                setSeverity(null);
            },
            (error) => {
                Alert.alert("⚠️ Σφάλμα Τοποθεσίας", "Δεν ήταν δυνατός ο εντοπισμός της τοποθεσίας.");
            },
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 60000 }
        );
    };

    return (
        <View style={styles.container}>
            <Button title="EMERGENCY MESSAGE" color="red" onPress={() => setModalVisible(true)} />

            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        setModalVisible(false);
                        setSelectedType(null); // Reset selection when closing
                        setSeverity(null);
                    }}
                >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Επιλογή Περιστατικού</Text>
                        <View style={styles.optionsContainer}>
                            {emergencyTypes.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[
                                        styles.incidentButton,
                                        selectedType?.id === item.id && { backgroundColor: selectedColor }
                                    ]}
                                    onPress={() => setSelectedType(item)}
                                >
                                    <Text style={styles.optionText}>{item.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {selectedType && (
                            <>
                                <Text style={styles.modalTitle}>Επιλογή Σοβαρότητας (0-5)</Text>
                                <View style={styles.severityContainer}>
                                    {[...Array(6).keys()].map((level) => (
                                        <TouchableOpacity
                                            key={level}
                                            style={[
                                                styles.severityButton,
                                                severity === level && { backgroundColor: selectedColor }
                                            ]}
                                            onPress={() => setSeverity(level)}
                                        >
                                            <Text style={styles.severityText}>{level}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </>
                        )}

                        <View style={styles.buttonContainer}>
                            {/* Cancel button is ALWAYS visible */}
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => {
                                    setModalVisible(false);
                                    setSelectedType(null);
                                    setSeverity(null);
                                }}
                            >
                                <Text style={styles.buttonText}>❌ ΑΚΥΡΩΣΗ</Text>
                            </TouchableOpacity>

                            {/* Show "ΑΠΟΣΤΟΛΗ ΜΗΝΥΜΑΤΟΣ" only when both selections are made */}
                            {selectedType && severity !== null && (
                                <TouchableOpacity style={styles.sendButton} onPress={getLocationAndSendMessage}>
                                    <Text style={styles.buttonText}>📩 ΑΠΟΣΤΟΛΗ ΜΗΝΥΜΑΤΟΣ</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
                </TouchableWithoutFeedback>

            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '85%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
    },
    incidentButton: {
        backgroundColor: '#ddd',
        padding: 15,
        margin: 5,
        borderRadius: 5,
        width: '45%',
        height: 73,
        justifyContent: 'center',
        alignItems: 'center',
    },
    severityContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    severityButton: {
        backgroundColor: '#ddd',
        padding: 10,
        margin: 5,
        borderRadius: 5,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        marginTop: 15,
        width: '100%',
    },
    sendButton: {
        backgroundColor: 'green',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    cancelButton: {
        backgroundColor: 'gray',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default EmergencyMessageButton;
