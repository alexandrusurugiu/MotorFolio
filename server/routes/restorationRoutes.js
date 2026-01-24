const express = require('express');
const router = express.Router();
const restorationController = require('../controllers/restorationController');
const { validateRestoration } = require('../validators/restorationValidator');
const { checkErrors } = require('../validators/validateResult');
const { validateAuthToken } = require('../middleware/auth');

router.post('/add-restoration', validateAuthToken, validateRestoration, checkErrors, restorationController.addRestoration);
router.get('/', validateAuthToken, restorationController.getRestorationListByUserId);
router.delete('/delete/:id', validateAuthToken, restorationController.deleteRestoration);
router.put('/update/:id', validateAuthToken, validateRestoration, checkErrors, restorationController.updateRestoration);

module.exports = router;