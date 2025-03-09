const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateAccessToken = (payload) => {
    console.log(payload);
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
};

exports.generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};