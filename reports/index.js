const express = require('express');
const router = express();

router.use('/', require('./getReports'));
// router.use('/', require('./downloadExcel'));

module.exports = router;

