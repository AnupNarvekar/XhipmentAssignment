const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.get('/', (req, res) => {
    console.log(req.method);
    console.log('Testing server');
    res.status(200).send({
        success: true,
        data: 'working'
    })
})

module.exports = app;
