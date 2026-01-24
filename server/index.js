const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const tunningRoutes = require('./routes/tunningRoutes');
const restorationRoutes = require('./routes/restorationRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(morgan('dev'));
app.use(cors({
    origin: ['https://motor-folio.vercel.app', 'http://localhost:5173'], 
    credentials: true
}));
app.use(express.json());

app.use('/server/auth', authRoutes);
app.use('/server/maintenance', maintenanceRoutes);
app.use('/server/tunning', tunningRoutes);
app.use('/server/restoration', restorationRoutes);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}...`);
})