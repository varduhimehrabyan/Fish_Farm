global.express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const bak = require('./jobFormail')
 
bak()
 
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/user", require("./controllers/auth"));
app.use("/pools", require("./controllers/api/pool"));
app.use("/info", require("./controllers/api/information"));
app.use("/reports", require("./controllers/api/reports"));
app.use("/feeding", require("./controllers/api/feedingAndLosses"));
app.use("/losses", require("./controllers/api/feedingAndLosses"));

// app.use('/', require('./fishFarm'));

app.listen(5001);
