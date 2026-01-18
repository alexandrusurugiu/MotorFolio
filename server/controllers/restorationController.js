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

const deleteRestoration = async(req, res) => {
    try {
        const { id } = req.params;

        await db.collection('restorations').doc(id).delete();

        res.status(200).json({ message: 'Restoration deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete restoration: ', error });
    }
}

const updateRestoration = async(req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        await db.collection('restorations').doc(id).update(data);

        res.status(200).json({ message: 'Restoration update successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update restoration: ', error });
    }
}

module.exports = {
    addRestoration,
    getRestorationListByUserId,
    deleteRestoration,
    updateRestoration
}