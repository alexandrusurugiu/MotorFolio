const { db } = require('../database/db');

const addTunning = async(req, res) => {
    try {
        const { userId, title, description, category, date, price, powerGained } = req.body;

        const newTunning = {
            userId,
            title,
            description,
            category,
            date,
            price: Number(price),
            powerGained: Number(powerGained),
            createdAt: new Date().toISOString()
        };
    
        const tunningRef = await db.collection('tunnings').add(newTunning);

        res.status(201).json({ message: 'Tunning added successfully!', id: tunningRef.id, ...newTunning });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add tunning: ', error });
    }
};

const getTunningListByUserId = async(req, res) => {
    try {
        const { userId } = req.params;

        const snapshot = await db.collection('tunnings').where('userId', '==', userId).get();
        const tunningList = [];
        snapshot.forEach(el => {
            tunningList.push({ id: el.id, ...el.data() });
        });

        res.json(tunningList);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tunning list: ', error });
    }
};

module.exports = {
    addTunning,
    getTunningListByUserId
};