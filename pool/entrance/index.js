const express = require('express');
const router = express();

router.use('/', require('./entrance'));


module.exports = router;

