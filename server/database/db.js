const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

function initializeDatabase() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    return admin.firestore();
}

const db = initializeDatabase();

module.exports = { db, admin };