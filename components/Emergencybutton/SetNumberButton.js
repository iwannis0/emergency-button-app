import React, { useState } from "react";
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity } from "react-native";

const SetNumberButton = ({ onNumberSet }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");

    const savePhoneNumber = () => {
        if (phoneNumber.trim() !== "") {
            onNumberSet(phoneNumber); // Send the new number to HomeScreen.tsx
            setModalVisible(false);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.buttonText}>SET NUMBER</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.label}>Enter Emergency Number:</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="phone-pad"
                            placeholder="+357 123456789"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={savePhoneNumber}>
                                <Text style={styles.modalButtonText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        alignItems: "center",
    },
    button: {
        backgroundColor: '#0c6c7a',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 5,
        width: 200,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        textAlign: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    modalButton: {
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        alignItems: "center",
    },
    saveButton: {
        backgroundColor: "green",
    },
    modalButtonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
    cancelButton: {
        backgroundColor: "gray",
    },
});

export default SetNumberButton;
