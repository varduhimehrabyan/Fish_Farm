const express = require('express');
const router = express();

router.use('/', require('./feedingAndLosses'));


module.exports = router;


