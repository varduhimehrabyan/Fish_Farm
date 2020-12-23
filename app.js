const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/user", require('./auth'));
app.use("/pools", require('./pool'));
app.use("/info", require('./information'));


app.listen(3000, () => {
    console.log('Server is running on port 3000')
});



