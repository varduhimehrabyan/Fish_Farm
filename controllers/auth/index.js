const express = require('express');
const router = express();

router.use('/', require('./auth'));

module.exports = router;