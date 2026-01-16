const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');

router.post('/add-maintenance', maintenanceController.addMaintenance);
router.get('/:userId', maintenanceController.getMaintenanceListByUserId);

module.exports = router;