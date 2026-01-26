const { db } = require('../database/db');

const addRestoration = async(req, res) => {
    try {
        const { title, description, date, price } = req.body;
        const userId = req.user.uid;
    
        const newRestoration = {
            userId,
            title,
            description,
            date,
            price: Number(price),
            status: 'pending',
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
        const userId = req.user.uid;

        const snapshot = await db.collection('restorations').where('userId', '==', userId).get();
        const restorationList = [];
        snapshot.forEach(el => {
            restorationList.push({ id: el.id, ...el.data() });
        });

        res.json(restorationList);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch restoration list: ', error });
    }
};

const deleteRestoration = async(req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.uid;
        const docRef = db.collection('restorations').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Restoration record could not be found!' });
        }

        if (doc.data().userId !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this restoration record!' });
        }

        await docRef.delete();

        res.status(200).json({ message: 'Restoration deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete restoration: ', error });
    }
}

const updateRestoration = async(req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.uid;
        const data = req.body;
        const docRef = db.collection('restorations').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Restoration record could not be found!' });
        }

        if (doc.data().userId !== userId) {
            return res.status(403).json({ message: 'You are not authorized to update this restoration record!' });
        }

        await docRef.update(data);

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