const express = require('express');
const router = express();

router.use('/', require('./login'));

module.exports = router;