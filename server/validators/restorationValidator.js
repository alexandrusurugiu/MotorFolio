const { body } = require('express-validator');

const validateRestoration = [
    body('title').trim().notEmpty().withMessage('Title is mandatory!'),
    body('price').notEmpty().withMessage('Price is mandatory!').isFloat({ min: 0 }).withMessage('Price must be a positive number!'),
    body('description').optional().trim().isLength({ max: 500 }).withMessage('Description can be up to 500 characters long!'),
    body('date').isISO8601().withMessage('Invalid date format!')
];

module.exports = { validateRestoration }