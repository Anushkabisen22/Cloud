const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Update path to your User model
const jwt = require('jsonwebtoken');

// Middleware to verify JWT and fetch user
const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, "anushka"); // Replace with your secret
        req.user = await User.findById(decoded.userId);
        if (!req.user) return res.status(404).json({ message: 'User not found' });
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Middleware to check BMI calculation limit
const checkBmiLimit = (req, res, next) => {
    if (req.user.bmiCount >= 5) {
        return res.status(403).json({ message: 'BMI calculation limit reached' });
    }
    next();
};

router.post('/calc', authenticateUser, checkBmiLimit, async (req, res) => {
    const { height, weight } = req.body;

    if (!height || !weight) {
        return res.status(400).json({ message: 'Height and weight are required' });
    }

    try {
        const bmi = weight / ((height / 100) ** 2);
        req.user.bmiCount += 1; // Increment BMI calculation count
        await req.user.save(); // Save updated user record

        res.json({ bmi });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
