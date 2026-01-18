const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');
const { validateMaintenance } = require('../validators/maintenanceValidator');
const { checkErrors } = require ('../validators/validateResult');

router.post('/add-maintenance', validateMaintenance, checkErrors, maintenanceController.addMaintenance);
router.get('/:userId', maintenanceController.getMaintenanceListByUserId);
router.delete('/delete/:id', maintenanceController.deleteMaintenance);
router.put('/update/:id', validateMaintenance, checkErrors, maintenanceController.updateMaintenance);

module.exports = router;