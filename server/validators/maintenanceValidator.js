const { body } = require('express-validator');

const validateMaintenance = [
    body('title').trim().notEmpty().withMessage('Title is mandatory!'),
    body('price').notEmpty().withMessage('Price is required!').isFloat({ min: 0 }).withMessage('Price must be a positive number!'),
    body('mileage').notEmpty().withMessage('Mileage is required!').isNumeric().withMessage('Mileage must be a number!')
];

module.exports = { validateMaintenance };