const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');
const { validateMaintenance } = require('../validators/maintenanceValidator');
const { checkErrors } = require ('../validators/validateResult');
const { validateAuthToken } = require('../middleware/auth');

router.post('/add-maintenance', validateAuthToken, validateMaintenance, checkErrors, maintenanceController.addMaintenance);
router.get('/', validateAuthToken, maintenanceController.getMaintenanceListByUserId);
router.delete('/delete/:id', validateAuthToken, maintenanceController.deleteMaintenance);
router.put('/update/:id', validateAuthToken, validateMaintenance, checkErrors, maintenanceController.updateMaintenance);

module.exports = router;