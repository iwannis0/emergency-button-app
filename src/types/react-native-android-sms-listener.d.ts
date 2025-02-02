declare module "react-native-android-sms-listener" {
    interface SMSMessage {
        originatingAddress: string;
        body: string;
        timestamp: number;
    }

    interface Subscription {
        remove(): void;
    }

    export default class SmsListener {
        static addListener(callback: (message: SMSMessage) => void): Subscription;
    }
}
