const express = require('express');
const router = express();

router.use('/fish', require('./addFish'));
router.use('/fish', require('./deleteFish'));
router.use('/fish', require('./updateFish'));
router.use('/fish', require('./getFishes'));



module.exports = router;


