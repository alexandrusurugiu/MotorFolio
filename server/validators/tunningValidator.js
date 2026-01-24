const { body } = require('express-validator');

const validateTunning = [
    body('title').trim().notEmpty().withMessage('Title is mandatory!'),
    body('category').isIn(['Engine', 'Suspension', 'Exhaust', 'Wheels', 'Exterior', 'Interior']).withMessage('Invalid category selected!'),
    body('price').isFloat({ min : 0 }).withMessage('Price must be a positive number!'),
    body('powerGained').isNumeric().withMessage('Power gained must be a number!'),
    body('description').optional().trim().isLength({ max: 500 }).withMessage('Description can be up to 500 characters long!'),
    body('date').isISO8601().toDate().withMessage('Invalid date format!')
];

module.exports = { validateTunning }