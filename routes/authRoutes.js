const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register - Simple version without bcrypt
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log('Registration attempt:', { username, password: password ? '****' : undefined });

        // Simple validation
        if (!username || !password) {
            console.log('Validation failed: missing username or password');
            return res.status(400).json({ error: 'Username and password required' });
        }

        if (username.trim().length === 0 || password.trim().length === 0) {
            console.log('Validation failed: empty username or password');
            return res.status(400).json({ error: 'Username and password cannot be empty' });
        }

        // Store plain password (basic auth - not for production!)
        const user = new User({ username, password });
        await user.save();
        console.log('User registered successfully:', username);
        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        console.error('Registration error:', error.message);
        if (error.code === 11000) {
            res.status(400).json({ error: 'Username already exists' });
        } else {
            res.status(500).json({ error: 'Error registering user: ' + error.message });
        }
    }
});

// Login - Simple password comparison
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Simple password comparison (no bcrypt)
        if (password === user.password) {
            const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
            res.json({ token, username: user.username });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

module.exports = router;
