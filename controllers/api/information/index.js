const express = require('express');
const router = express();

router.use('/fish', require('./fish'));
router.use('/food', require('./food'));
router.use('/partner', require('./partner'));



module.exports = router;
