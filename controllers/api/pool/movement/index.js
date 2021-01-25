const express = require('express');
const router = express();

router.use('/', require('./movement'));


module.exports = router;


