require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.json ( {message:`API is running`}));

const port = process.env.PORT || 5000;

app.listen(port, () => {`server running on port: ${port}`});