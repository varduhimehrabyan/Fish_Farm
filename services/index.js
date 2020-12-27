const express = require('express');
const router = express();

router.use('/', require('./sendMail'));
router.use('/', require('./writeInLogsFile'));


module.exports = router;

