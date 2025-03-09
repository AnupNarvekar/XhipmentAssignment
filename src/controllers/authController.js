const User = require('../models/users');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        let user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Registration failed' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const accessToken = generateAccessToken({ id: user._id });
        const refreshToken = generateRefreshToken({ id: user._id });
        res.json({ accessToken, refreshToken });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed' });
    }
};

exports.refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken)
            return res.status(400).json({ error: 'No refresh token provided' });
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
            if (err) return res.status(403).json({ error: 'Invalid refresh token' });
            const accessToken = generateAccessToken({ id: user.id });
            res.json({ accessToken });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not refresh token' });
    }
};
