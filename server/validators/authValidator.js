const { body } = require('express-validator');

const authRegister = [
    body('name').trim().notEmpty().withMessage('The name is mandatory!'),
    body('email').trim().isEmail().withMessage('The email address is not valid!'),
    body('password').trim().isLength({ min: 6 }).withMessage('The password must be at least 6 characters long!'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('The passwords do not match!');
        }

        return true;
    })
];

const authLogin = [
    body('email').trim().isEmail().withMessage('Please insert a valid email address!'),
    body('password').notEmpty().withMessage('Please insert the password!')
];

module.exports = { authRegister, authLogin };