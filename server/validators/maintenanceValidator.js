const { body } = require('express-validator');

const validateMaintenance = [
    body('title').trim().notEmpty().withMessage('Title is mandatory!'),
    body('price').notEmpty().withMessage('Price is required!').isFloat({ min: 0 }).withMessage('Price must be a positive number!'),
    body('mileage').notEmpty().withMessage('Mileage is required!').isNumeric().withMessage('Mileage must be a number!').isFloat({ min: 0 }).withMessage('Mileage must be a positive number!'),
    body('description').optional().trim().isLength({ max: 500 }).withMessage('Description can be up to 500 characters long!'),
    body('date').isISO8601().toDate().withMessage('Invalid date format!')
];

module.exports = { validateMaintenance };