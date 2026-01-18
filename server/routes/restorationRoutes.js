const express = require('express');
const router = express.Router();
const restorationController = require('../controllers/restorationController');

router.post('/add-restoration', restorationController.addRestoration);
router.get('/:userId', restorationController.getRestorationListByUserId);
router.delete('/delete/:id', restorationController.deleteRestoration);

module.exports = router;