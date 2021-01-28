const express = require('express');
const router = express();

router.use('/', require('./addLosses'));

module.exports = router;


