require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>( {message:`API is running`}));

const port = process.env.PORT || 5000;

app.listen(port, () => {`server running on port: ${5000}`});