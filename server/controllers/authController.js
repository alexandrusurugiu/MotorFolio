const db = require('../database/db');
const { validationResult } = require('express-validator');
const { hashPassword, generateToken, comparePassword } = require('../auth/passLogic');

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;

const register = async (req, res) => {
    const errors = validationResult (req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        const query = await db.collection('users').where('email', '==', email).get();
        if (!query.empty) {
            return res.status(409).json({ message: 'User with this email already exists!' });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = await db.collection('users').add ({
            name,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        });

        const tokenPayload = { id: newUser.id, email: email };
        const token = generateToken(tokenPayload);
        
        res.status(201).json({ message: 'The user has been successfully created!', token, userId: newUser.id });
    } catch (error) {
        res.status(500).json({ message: 'The user registration failed, please try again!' });
    }
};

const login = async (req, res) => {
    const errors = validationResult (req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const query = await db.collection('users').where('email', '==', email).get();

        if (query.empty) {
            return res.status(401).json({ message: 'Invalid email or password!' });
        }

        const userDoc = query.docs[0];
        const userData = userDoc.data();
        const isPasswordValid = await comparePassword(password, userData.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials!' });
        }

        const tokenPayload = { id: userDoc.id, email: userData.email };
        const token = generateToken(tokenPayload);

        res.json({
            token,
            user: {
                id: userDoc.id,
                name: userData.name,
                email: userData.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Authentication failed!'});
    }
};

module.exports = {
    register, 
    login
};