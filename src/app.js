// packages
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// local imports
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');

const app = express();

// Global middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/orders', orderRoutes);

app.get('/', (req, res) => {
    console.log(req.method);
    console.log('Testing server');
    res.status(200).send({
        success: true,
        data: 'working'
    })
})

module.exports = app;
