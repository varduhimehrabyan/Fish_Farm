const express = require('express');
const router = express();

router.use('/', require('./feeding'));
router.use('/', require('./losses'));

module.exports = router;


