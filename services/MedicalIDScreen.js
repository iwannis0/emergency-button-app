import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const STORAGE_KEY = '@medical_id';

const MedicalIDScreen = () => {
    const [medicalData, setMedicalData] = useState(null);
    const [editing, setEditing] = useState(false);

    const fields = [
        { key: 'name', label: 'Full Name' },
        { key: 'age', label: 'Age' },
        { key: 'bloodType', label: 'Blood Type', type: 'picker' },
        { key: 'diseases', label: 'Diseases / Conditions' },
        { key: 'medications', label: 'Medications' },
        { key: 'emergencyContact', label: 'Emergency Contact' },
    ];

    useEffect(() => {
        const load = async () => {
            const data = await AsyncStorage.getItem(STORAGE_KEY);
            if (data) {
                setMedicalData(JSON.parse(data));
                setEditing(false);
            } else {
                setMedicalData(Object.fromEntries(fields.map(f => [f.key, ''])));
                setEditing(true);
            }
        };
        load();
    }, []);

    const saveData = async () => {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(medicalData));
        Alert.alert('Saved', 'Medical ID saved successfully');
        setEditing(false);
    };

    const resetData = async () => {
        await AsyncStorage.removeItem(STORAGE_KEY);
        setMedicalData(Object.fromEntries(fields.map(f => [f.key, ''])));
        setEditing(true);
    };

    if (!medicalData) return null;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {fields.map(f => (
                <View key={f.key} style={styles.field}>
                    <Text style={styles.label}>{f.label}</Text>
                    {f.type === 'picker' ? (
                        <View style={[styles.input, !editing && styles.disabled, { padding: 0, height: 50 }]}>
                            <Picker
                                enabled={editing}
                                selectedValue={medicalData[f.key]}
                                onValueChange={val => setMedicalData({ ...medicalData, [f.key]: val })}
                                style={{ height: 38, width: '100%', marginTop: -4 }}
                                dropdownIconColor="#555"
                            >
                                <Picker.Item label="Select Blood Type..." value="" />
                                <Picker.Item label="A+" value="A+" />
                                <Picker.Item label="A-" value="A-" />
                                <Picker.Item label="B+" value="B+" />
                                <Picker.Item label="B-" value="B-" />
                                <Picker.Item label="AB+" value="AB+" />
                                <Picker.Item label="AB-" value="AB-" />
                                <Picker.Item label="O+" value="O+" />
                                <Picker.Item label="O-" value="O-" />
                            </Picker>
                        </View>
                    ) : (
                        <TextInput
                            style={[styles.input, !editing && styles.disabled]}
                            editable={editing}
                            value={medicalData[f.key]}
                            onChangeText={val => setMedicalData({ ...medicalData, [f.key]: val })}
                        />
                    )}
                </View>
            ))}
            <View style={styles.buttons}>
                {editing ? (
                    <Button title="Save" onPress={saveData} />
                ) : (
                    <>
                        <Button title="Edit" onPress={() => setEditing(true)} />
                        <View style={{ height: 10 }} />
                        <Button title="Reset" onPress={resetData} color="red" />
                    </>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, paddingTop: 40 },
    field: { marginBottom: 15 },
    label: { fontWeight: 'bold', marginBottom: 5 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white'
    },
    disabled: { backgroundColor: '#eee' },
    buttons: { marginTop: 20 }
});

export default MedicalIDScreen;
