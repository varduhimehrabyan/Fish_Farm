const express = require('express');
const router = express();

router.use('/', require('./getCurrentReports'));
router.use('/', require('./getReportsForMonth'));
router.use('/', require('./download'));

module.exports = router;

