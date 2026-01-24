const { db } = require('../database/db');

const addTunning = async(req, res) => {
    try {
        const { title, description, category, date, price, powerGained } = req.body;
        const userId = req.user.uid;

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
        const userId = req.user.uid;

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

const deleteTunning = async(req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.uid;
        const docRef = db.collection('tunnings').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Tunning record could not be found!' });
        }

        if (doc.data().userId !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this tunning record!' });
        }

        await docRef.delete();

        res.status(200).json({ message: 'Tunning deleted successfully!'});
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete the tunning: ', error });
    }
}

const updateTunning = async(req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.uid;
        const data = req.body;
        const docRef = db.collection('tunnings').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Tunning record could not be found!' });
        }

        if (doc.data().userId !== userId) {
            return res.status(403).json({ message: 'You are not authorized to update this tunning record!' });
        }

        await docRef.update(data);

        res.status(200).json({ message: 'Tunning updated successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update tunning: ', error });
    }
}

module.exports = {
    addTunning,
    getTunningListByUserId,
    deleteTunning,
    updateTunning
};