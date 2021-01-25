const express = require('express');
const router = express();

router.use('/', require('./addPool'));
router.use('/', require('./deletePool'));
router.use('/', require('./updatePool'));
router.use('/', require('./getPoolsAndDetails'));
router.use('/', require('./getPools'));
router.use('/', require('./sale'));
router.use('/', require('./movement'));
router.use('/', require('./inPool'));
router.use('/', require('./getPoolsAndDetails'));


module.exports = router;


