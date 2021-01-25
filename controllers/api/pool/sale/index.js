const express = require('express');
const router = express();

router.use('/', require('./sale'));


module.exports = router;


