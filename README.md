# 🆘 Emergency Button App for Elderly People

This is a **React Native** mobile application designed to assist **elderly users** in case of emergency. When the user presses the SOS button on their wearable device (GH5200 or TMT250), the application receives and processes an alert containing GPS location data and displays it on a map. The app also allows the user to manually send emergency alerts via call or SMS.

---

## 📱 Features

- 🆘 Automatically receives SMS alerts from GH5200 or TMT250 device
- 📍 Displays user's location on a live map using coordinates from the SMS
- 📞 Allows the user to call a predefined emergency contact with one tap
- ✉️ Sends predefined emergency SMS with location manually
- 🕓 Keeps a history log of received alerts
- ⚙️ Lets the user change the emergency contact number

---

## 🔧 Technologies Used

- React Native (Android)
- `react-native-maps` – for displaying the map
- `react-native-android-sms-listener` – to listen for incoming SMS
- `@react-native-async-storage/async-storage` – for storing history
- `react-native-permissions` – for runtime permission requests

---

## 📦 Installation

```bash
git clone https://github.com/iwannis0/emergency-button-app.git
cd emergency-button-app
npm install
npx expo start
