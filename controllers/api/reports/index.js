const express = require('express');
const router = express();

router.use('/', require('./getReports'));
router.use('/', require('./download'));

module.exports = router;

