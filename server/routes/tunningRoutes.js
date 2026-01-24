const express = require('express');
const router = express.Router();
const tunningController = require('../controllers/tunningController');
const { validateTunning } = require('../validators/tunningValidator');
const { checkErrors } = require('../validators/validateResult');
const { validateAuthToken } = require('../middleware/auth');

router.post('/add-tunning', validateAuthToken, validateTunning, checkErrors, tunningController.addTunning);
router.get('/', validateAuthToken, tunningController.getTunningListByUserId);
router.delete('/delete/:id', validateAuthToken, tunningController.deleteTunning);
router.put('/update/:id', validateAuthToken, validateTunning, checkErrors, tunningController.updateTunning);

module.exports = router;