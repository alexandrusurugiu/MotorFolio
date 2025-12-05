const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'MotorFolio API is running!',
        status: 'success'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}...`);
})