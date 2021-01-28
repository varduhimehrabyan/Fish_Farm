const express = require('express');
const router = express();

router.use('/', require('./pool'));
router.use('/', require('./sale'));
router.use('/', require('./movement'));
router.use('/', require('./inPool'));


module.exports = router;


