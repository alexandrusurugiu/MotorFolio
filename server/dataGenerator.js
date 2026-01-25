const { faker } = require('@faker-js/faker');
const admin = require('firebase-admin');
require('dotenv').config();

const UID = process.env.UID;
const CNT = 20;
const serviceAccount = JSON.parse(process.env.FIREBASE_ACCOUNT_KEY);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const maintenanceTasks = [
    'Oil Change 5W-30', 'Brake Pads Replacement', 'Air Filter Change', 
    'Spark Plugs Replacement', 'Timing Belt Service', 'Transmission Fluid Flush',
    'Coolant Flush', 'Battery Replacement', 'Tire Rotation', 'Suspension Check'
];

const tunningParts = [
    'Stage 1 Remap', 'Cold Air Intake', 'Cat-back Exhaust', 'Coilovers KW V3',
    'Intercooler Upgrade', 'Turbo K04 Hybrid', 'Forged Pistons', 'Brembo Big Brake Kit',
    'Lightweight Wheels', 'Carbon Fiber Spoiler'
];
const tunningCategories = ['Engine', 'Suspension', 'Exhaust', 'Wheels', 'Exterior', 'Interior'];

const restorationTasks = [
    'Rust Removal', 'Full Paint Job', 'Leather Seat Restoration', 'Dashboard Repair',
    'Chrome Polishing', 'Engine Bay Detailing', 'Underbody Coating', 'Headlight Restoration'
];

async function generateMaintenance() {
    const batch = db.batch();

    for (let i = 0; i < CNT; i++) {
        const docRef = db.collection('maintenances').doc();
        batch.set(docRef, {
            userId: UID,
            title: faker.helpers.arrayElement(maintenanceTasks),
            description: faker.lorem.sentence(),
            date: faker.date.past({ years: 3 }),
            price: parseFloat(faker.commerce.price({ min: 100, max: 10000 })),
            mileage: faker.number.int({ min: 5000, max: 400000 }),
            createdAt: new Date().toISOString()
        });
    }

    await batch.commit();
    console.log('Maintenance data generated');
}

async function generateTunning() {
    const batch = db.batch();

    for (let i = 0; i < CNT; i++) {
        const docRef = db.collection('tunnings').doc();
        batch.set(docRef, {
            userId: UID,
            title: faker.helpers.arrayElement(tunningParts),
            description: faker.lorem.sentence(),
            category: faker.helpers.arrayElement(tunningCategories),
            date: faker.date.past({ years: 3 }),
            price: parseFloat(faker.commerce.price({ min: 100, max: 10000 })),
            powerGained: faker.number.int({ min: 5, max: 150 }),
            createdAt: new Date().toISOString()
        });
    }

    await batch.commit();
    console.log('Tunning data generated');
}

async function generateRestoration() {
    const batch = db.batch();

    for (let i = 0; i < CNT; i++) {
        const docRef = db.collection('restorations').doc();
        const isCompleted = faker.datatype.boolean();
        batch.set(docRef, {
            userId: UID,
            title: faker.helpers.arrayElement(restorationTasks),
            description: faker.lorem.sentence(),
            date: faker.date.past({ years: 3 }),
            price: parseFloat(faker.commerce.price({ min: 100, max: 20000 })),
            status: isCompleted ? 'Completed' : 'In Progress',
            createdAt: new Date().toISOString()
        });
    }

    await batch.commit();
    console.log('Restoration data generated');
}

async function run() {
    try {
        await generateMaintenance();
        await generateTunning();
        await generateRestoration();

        console.log('Data generation completed');
    } catch (error) {
        console.error('Error generating data:', error);
    }
}

run();