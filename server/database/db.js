const admin = require('firebase-admin');
const serviceAccount = process.env.FIREBASE_ACCOUNT_KEY ? JSON.parse(process.env.FIREBASE_ACCOUNT_KEY) : require('./serviceAccountKey.json');

function initializeDatabase() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    return admin.firestore();
}

const db = initializeDatabase();

module.exports = { db, admin };