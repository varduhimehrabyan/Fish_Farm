const express = require('express');
const router = express();

router.use('/', require('./getReports'));


module.exports = router;

