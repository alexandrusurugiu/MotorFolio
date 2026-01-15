const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/server/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}...`);
})