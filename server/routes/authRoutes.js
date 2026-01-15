const express = require('express');
const router = express.Router();
const { authRegister, authLogin } = require('../validators/authValidator');
const authController = require('../controllers/authController');

router.post('/register', authRegister, authController.register);
router.post('/login', authLogin, authController.login);

module.exports = router;