import BleManager from 'react-native-ble-manager';
import { Alert, PermissionsAndroid, NativeModules, NativeEventEmitter } from 'react-native';

const TMT250_CONFIG = {
    SERVICE_UUID: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E',
    CHARACTERISTIC_UUID: '6E400003-B5A3-F393-E0A9-E50E24DCCA9E',
    DEVICE_PREFIX: 'TMT250'
};

class BluetoothService {
    private bleManager: typeof BleManager;
    private bleEmitter: NativeEventEmitter;

    constructor() {
        this.bleManager = BleManager;
        this.bleEmitter = new NativeEventEmitter(NativeModules.BleManager);

        // Initialize BLE Manager
        this.bleManager.start({ showAlert: false })
            .then(() => console.log("✅ BLE Manager Initialized"))
            .catch(error => console.error("❌ BLE Manager Init Error:", error));
    }

    async requestPermissions() {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            ]);

            if (
                granted["android.permission.BLUETOOTH_SCAN"] !== PermissionsAndroid.RESULTS.GRANTED ||
                granted["android.permission.BLUETOOTH_CONNECT"] !== PermissionsAndroid.RESULTS.GRANTED ||
                granted["android.permission.ACCESS_FINE_LOCATION"] !== PermissionsAndroid.RESULTS.GRANTED
            ) {
                Alert.alert("Permission Denied", "Bluetooth permissions are required!");
            }
        } catch (error) {
            console.warn("BLE Permissions Error:", error);
        }
    }

    async connect(deviceId: string) {
        try {
            console.log(`🔄 Connecting to ${deviceId}...`);
            await this.bleManager.connect(deviceId);
            await this.bleManager.retrieveServices(deviceId);
            console.log(`✅ Connected to ${deviceId}`);

            this.monitorCharacteristics(deviceId);
        } catch (error) {
            console.error("❌ BLE Connection Error:", error);
        }
    }

    private monitorCharacteristics(deviceId: string) {
        console.log(`📡 Starting Notification for ${deviceId}`);

        this.bleManager.startNotification(
            deviceId,
            TMT250_CONFIG.SERVICE_UUID,
            TMT250_CONFIG.CHARACTERISTIC_UUID
        ).then(() => {
            console.log("✅ Notifications started!");
        }).catch(error => {
            console.error("❌ Error starting notification:", error);
        });

        this.bleEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', ({ value }) => {
            const decodedValue = String.fromCharCode(...value);
            console.log("📩 Received Data:", decodedValue);

            if (this.isEmergencySignal(decodedValue)) {
                Alert.alert('🚨 Emergency Alert', 'Emergency button pressed on TMT250!');
            }
        });
    }

    private isEmergencySignal(data: string): boolean {
        return data.includes('EMERGENCY') || data.includes('INPUT1:1');
    }
}

export default BluetoothService;
