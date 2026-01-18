const express = require('express');
const router = express.Router();
const tunningController = require('../controllers/tunningController');
const { validateTunning } = require('../validators/tunningValidator');
const { checkErrors } = require('../validators/validateResult');

router.post('/add-tunning', validateTunning, checkErrors, tunningController.addTunning);
router.get('/:userId', tunningController.getTunningListByUserId);
router.delete('/delete/:id', tunningController.deleteTunning);
router.put('/update/:id', validateTunning, checkErrors, tunningController.updateTunning);

module.exports = router;