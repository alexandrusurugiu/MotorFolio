const express = require('express');
const router = express.Router();
const tunningController = require('../controllers/tunningController');

router.post('/add-tunning', tunningController.addTunning);
router.get('/:userId', tunningController.getTunningListByUserId);

module.exports = router;