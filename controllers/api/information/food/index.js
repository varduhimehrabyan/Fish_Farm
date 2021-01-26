const express = require('express');
const router = express();

router.use('/', require('./food'));


module.exports = router;


