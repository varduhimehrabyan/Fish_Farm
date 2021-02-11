global.express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
// const jobForMail = require("./jobForMail.js");
require("dotenv").config();
// const job = require('./job.js');
// global.process.env = process.env;
// const secureEnv = require('secure-env');
global.env = process.env
// secureEnv({secret:'Zh-43VTW4fGVZK6fW4Ls'});
 

app.use('/', require('./fishFarm'));

app.use(express.json());
app.use(cookieParser());
app.use(cors());
// jobForMail()
app.use("/user", require("./controllers/auth"));
app.use("/pools", require("./controllers/api/pool"));
app.use("/info", require("./controllers/api/information"));
app.use("/reports", require("./controllers/api/reports"));
app.use("/feeding", require("./controllers/api/feedingAndLosses/feeding"));
app.use("/losses", require("./controllers/api/feedingAndLosses/losses"));

app.listen(4000, () => {
  console.log('Server is running on port 4000')
});
