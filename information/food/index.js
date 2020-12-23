const express = require('express');
const router = express();

router.use('/food', require('./addFood'));
router.use('/food', require('./deleteFood'));
router.use('/food', require('./updateFood'));
router.use('/food', require('./getFoods'));



module.exports = router;


