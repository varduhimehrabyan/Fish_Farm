const express = require('express');
const router = express();

router.use('/', require('./feedingHistory'));

module.exports = router;


