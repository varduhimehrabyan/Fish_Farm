global.express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const job = require('./job.js')
require('dotenv').config();
global.process.env = process.env

app.use(express.json());
app.use(cookieParser());
app.use(cors());
job()
app.use("/user", require('./controllers/auth'));
app.use("/pools", require('./controllers/api/pool'));
app.use("/info", require('./controllers/api/information'));
app.use("/reports", require('./controllers/api/reports'));


app.listen(4000, () => {
    console.log('Server is running on port 4000')
});



