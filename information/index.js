const express = require('express');
const router = express();

router.use('/', require('./fish'));
router.use('/', require('./food'));
router.use('/', require('./partner'));



module.exports = router;
