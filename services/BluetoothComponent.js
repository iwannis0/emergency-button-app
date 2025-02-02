import React, { useEffect } from 'react';
import { BleManager } from 'react-native-ble-plx';
import { Alert, Platform, PermissionsAndroid } from 'react-native';
import { Buffer } from 'buffer'; // For data decoding

const BluetoothComponent = ({ onDeviceConnected }) => {
    const manager = new BleManager();

    // Function to request Bluetooth permissions (Android only)
    async function requestBluetoothPermissions() {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                ]);

                if (
                    granted['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
                    granted['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
                    granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
                ) {
                    console.log('All Bluetooth permissions granted');
                } else {
                    console.log('Bluetooth permissions denied');
                }
            } catch (err) {
                console.warn('Error requesting Bluetooth permissions:', err);
            }
        }
    }

    useEffect(() => {
        const checkBluetoothState = async () => {
            // Request permissions on Android
            await requestBluetoothPermissions();

            manager.onStateChange((state) => {
                console.log('Bluetooth state:', state);

                if (state === 'PoweredOn') {
                    console.log('Bluetooth is on and ready.');
                    startScanning();  // Call the function to start scanning if Bluetooth is powered on
                } else if (state === 'PoweredOff') {
                    console.log('Bluetooth is not powered on:', state);

                    // Prompt user to enable Bluetooth if Android
                    if (Platform.OS === 'android') {
                        Alert.alert(
                            'Enable Bluetooth',
                            'Bluetooth is turned off. Please enable it to proceed.',
                            [
                                {
                                    text: 'Enable',
                                    onPress: async () => {
                                        try {
                                            await manager.enable(); // This works for Android only
                                            console.log('Bluetooth enabled successfully.');
                                        } catch (error) {
                                            console.error('Error enabling Bluetooth:', error);
                                        }
                                    },
                                },
                                {
                                    text: 'Cancel',
                                    style: 'cancel',
                                },
                            ]
                        );
                    }
                }
            }, true);
        };

        const startScanning = () => {
            console.log('Starting Bluetooth scan...');
            manager.startDeviceScan(null, null, (error, scannedDevice) => {
                if (error) {
                    console.error('Scan error:', error);
                    return;
                }

                console.log('Scanned device:', scannedDevice.name); // Log all scanned devices

                // Check if the scanned device matches the TMT250
                if (scannedDevice.name === 'TMT250' || scannedDevice.name === 'TMT250_0914666' || scannedDevice.name === 'TMT250_0914666_LE' || scannedDevice.name === 'TMT250_0014525_LE') {
                    console.log('TMT250 found, attempting to connect...');
                    manager.stopDeviceScan(); // Stop scanning once the device is found

                    // Try connecting to the device
                    scannedDevice.connect()
                        .then(async (connectedDevice) => {
                            console.log('Connected to device:', connectedDevice.name);

                            // Discover services and characteristics
                            await discoverServicesAndCharacteristics(connectedDevice);
                        })
                        .catch((err) => {
                            console.error('Connection error:', err);
                        });
                }
            });
        };


        const discoverServicesAndCharacteristics = async (device) => {
            try {
                console.log('Discovering services and characteristics...');
                await device.discoverAllServicesAndCharacteristics();
                console.log('Services and characteristics discovered.');
                // Monitor the TX characteristic for incoming data
                console.log('Setting up notification for TX characteristic...');
                device.monitorCharacteristicForService(
                    '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', // UART Service UUID
                    '6E400003-B5A3-F393-E0A9-E50E24DCCA9E', // TX Characteristic UUID
                    (error, characteristic) => {
                        if (error) {
                            console.error('Notification error:', error);
                            return;
                        }

                        console.log('Notification triggered:', characteristic);

                        if (characteristic?.value) {
                            const rawData = Buffer.from(characteristic.value, 'base64').toString('utf-8');
                            console.log('Raw Data:', rawData);
                            handleIncomingData(rawData, device);
                        } else {
                            console.log('No data received from TX characteristic.');
                        }
                    }
                );
                console.log('Notification setup complete.');
            } catch (err) {
                console.error('Service discovery error:', err);
            }
        };


        const handleIncomingData = (data, device) => {
            try {
                const timestamp = new Date().toISOString(); // Local timestamp
                console.log('Timestamp:', timestamp);

                // Parse incoming data (Assuming JSON format for demonstration purposes)
                const parsedData = JSON.parse(data);

                if (parsedData.event && parsedData.event.type === 'SOS') { // Assuming SOS indicates an emergency
                    const emergencyDetails = {
                        deviceId: device.id,
                        timestamp,
                        location: parsedData.gps
                            ? {
                                latitude: parsedData.gps.latitude,
                                longitude: parsedData.gps.longitude,
                            }
                            : null,
                        speed: parsedData.gps?.speed || 'N/A',
                        direction: parsedData.gps?.direction || 'N/A',
                        batteryStatus: parsedData.status?.battery || 'N/A',
                        geofenceAlert: parsedData.status?.geofence || 'None',
                    };

                    console.log('Emergency Details:', emergencyDetails);

                    // Trigger the callback with emergency details
                    onDeviceConnected(emergencyDetails);  // Call callback prop with details

                }
            } catch (err) {
                console.error('Data parsing error:', err);
            }
        };

        // Call checkBluetoothState to start the process
        checkBluetoothState();

        return () => {
            // Cleanup Bluetooth manager on unmount
            manager.stopDeviceScan();
            manager.destroy();
        };
    }, []);

    return null;
};

export default BluetoothComponent;
