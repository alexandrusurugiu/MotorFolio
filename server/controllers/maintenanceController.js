const { db } = require('../database/db');

const addMaintenance = async(req, res) => {
    try {
        const { userId, title, description, date, price, mileage } = req.body;

        const newMaintenance = {
            userId,
            description,
            date,
            title,
            price: Number(price),
            mileage: Number(mileage),
            createdAt: new Date().toISOString()
        };

        const maintenanceRef = await db.collection('maintenances').add(newMaintenance);

        res.status(201).json({ message: 'Maintenance added successfully', id: maintenanceRef.id, ...newMaintenance });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add maintenance: ', error });
    }
};

const getMaintenanceListByUserId = async(req, res) => {
    try {
        const { userId } = req.params;

        const snapshot = await db.collection('maintenances').where('userId', '==', userId).get();
        const maintenanceList = [];
        snapshot.forEach(el => {
            maintenanceList.push({ id: el.id, ...el.data() });
        });

        res.json(maintenanceList);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch maintenance list: ', error });
    }
};

const deleteMaintenance = async(req, res) => {
    try {
        const { id } = req.params;

        await db.collection('maintenances').doc(id).delete();

        res.status(200).json({ message: 'Maintenance deleted successfully!'});
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete maintenance: ', error });
    }
}

const updateMaintenance = async(req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        await db.collection('maintenances').doc(id).update(data);

        res.status(200).json({ message: 'Maintenance updated successfully!' });
    } catch (error) {
        res.status(500).josn({ message: 'Failed to update maintenance: ', error });
    }
}

module.exports = { 
    addMaintenance,
    getMaintenanceListByUserId,
    deleteMaintenance,
    updateMaintenance
};