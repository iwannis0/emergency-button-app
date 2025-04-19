import SQLite from "react-native-sqlite-storage";

// Initialize SQLite Database
const db = SQLite.openDatabase(
    { name: "EmergencySMS.db", location: "default" },
    () => console.log("Database opened"),
    (error) => console.error("Database Error:", error)
);

// Create Table for SMS Messages
export const createSMSTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS sms_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sender TEXT,
        message TEXT,
        timestamp TEXT
      );`,
            [],
            () => console.log("SMS Table created successfully"),
            (error) => console.error("Error creating SMS table", error)
        );
    });
};

export const saveSMS = (sms) => {
    db.transaction((tx) => {
        tx.executeSql(
            `INSERT INTO sms_messages (sender, message, timestamp)
            VALUES (?, ?, ?);`,
            [sms.sender, sms.message, new Date().toISOString()],
            (_, result) => console.log("✅ SMS saved in DB:", result),
            (error) => console.error("❌ Error saving SMS", error)
        );
    });
};

export const clearAllSMS = (callback) => {
    db.transaction((tx) => {
        tx.executeSql(
            `DELETE FROM sms_messages;`, // Clear all records
            [],
            () => {
                console.log("🗑️ All SMS messages deleted");
                callback(); // Callback to refresh UI
            },
            (error) => console.error("❌ Error deleting SMS messages", error)
        );
    });
};


export const getAllSMS = (callback) => {
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM sms_messages ORDER BY timestamp DESC;`,
            [],
            (_, { rows }) => {
                let messages = [];
                for (let i = 0; i < rows.length; i++) {
                    messages.push(rows.item(i));
                }
                console.log("📥 Retrieved SMS Messages from DB:", messages);
                callback(messages);
            },
            (error) => console.error("❌ Error fetching SMS messages", error)
        );
    });
};

