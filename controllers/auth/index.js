const express = require('express');
const router = express();

router.use('/', require('./auth'));
router.use('/', require('./sendMail'));
router.use('/', require('./tokenVerify'));


module.exports = router;