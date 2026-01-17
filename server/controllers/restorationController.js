const { db } = require('../database/db');

const addRestoration = async(req, res) => {
    try {
        const { userId, title, description, date, price } = req.body;
    
        const newRestoration = {
            userId,
            title,
            description,
            date,
            price: Number(price),
            createdAt: new Date().toISOString()
        };

        const restorationRef = await db.collection('restorations').add(newRestoration);

        res.status(201).json({ message: 'Restoration added successfully!', id: restorationRef.id, ...newRestoration });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add restoration: ', error});
    }
};

const getRestorationListByUserId = async(req, res) => {
    try {
        const { userId } = req.params;

        const snapshot = await db.collection('restorations').where('userId', '==', userId).get();
        const restorationList = [];
        snapshot.forEach(el => {
            restorationList.push({ id: el.id, ...el.data() });
        });

        res.json(restorationList);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch restoration list: ', ereror });
    }
};

module.exports = {
    addRestoration,
    getRestorationListByUserId
}