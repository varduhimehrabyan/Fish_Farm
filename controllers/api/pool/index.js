const express = require('express');
const router = express();

router.use('/', require('./pool'));


module.exports = router;


