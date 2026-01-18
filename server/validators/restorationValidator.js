const { body } = require('express-validator');

const validateRestoration = [
    body('title').trim().notEmpty().withMessage('Title is mandatory!')
];

module.exports = { validateRestoration }