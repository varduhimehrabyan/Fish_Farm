const express = require('express');
const router = express();

router.use('/', require('./partner'));


module.exports = router;


