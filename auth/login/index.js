const express = require('express');
const router = express();

router.use('/', require('./login'));
router.use('/', require('./logout'));
router.use('/', require('./tokenVerify'));
router.use('/', require('./sendMail'));


module.exports = router;


