import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet, Alert } from "react-native";
import { getAllSMS, clearAllSMS } from "../services/DatabaseHelper";

const SMSHistoryScreen = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        loadSMSMessages();
    }, []);

    const loadSMSMessages = () => {
        getAllSMS(setMessages);
    };

    const handleClearMessages = () => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete all messages?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        clearAllSMS(() => setMessages([])); // Clear UI after deletion
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button title="REFRESH MESSAGES" onPress={loadSMSMessages} />
                <Button title="CLEAR MESSAGES" color="red" onPress={handleClearMessages} />
            </View>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.messageContainer}>
                        <Text style={styles.sender}>📩 {item.sender}</Text>
                        <Text style={styles.message}>{item.message}</Text>
                        <Text style={styles.timestamp}>🕒 {item.timestamp}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyMessage}>No messages found.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8f9fa",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop:40,
        marginBottom: 15,
    },
    messageContainer: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
    },
    sender: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#007bff",
    },
    message: {
        fontSize: 16,
        marginVertical: 5,
    },
    timestamp: {
        fontSize: 12,
        color: "#6c757d",
    },
    emptyMessage: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
        color: "#6c757d",
    },
});

export default SMSHistoryScreen;
