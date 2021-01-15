const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
global.process.env = process.env

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/user", require('./auth'));
app.use("/pools", require('./pool'));
app.use("/info", require('./information'));
app.use("/reports", require('./reports'));



app.listen(4000, () => {
    console.log('Server is running on port 4000')
});



