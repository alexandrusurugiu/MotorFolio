const express = require('express');
const router = express.Router();
const restorationController = require('../controllers/restorationController');
const { validateRestoration } = require('../validators/restorationValidator');
const { checkErrors } = require('../validators/validateResult');

router.post('/add-restoration', validateRestoration, checkErrors, restorationController.addRestoration);
router.get('/:userId', restorationController.getRestorationListByUserId);
router.delete('/delete/:id', restorationController.deleteRestoration);
router.put('/update/:id', validateRestoration, checkErrors, restorationController.updateRestoration);

module.exports = router;