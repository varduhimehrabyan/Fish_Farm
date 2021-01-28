const express = require('express');
const router = express();

router.use('/', require('./addFeeding'));

module.exports = router;


