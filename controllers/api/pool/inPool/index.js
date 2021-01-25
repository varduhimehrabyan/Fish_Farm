const express = require('express');
const router = express();

router.use('/', require('./inPool'));


module.exports = router;

