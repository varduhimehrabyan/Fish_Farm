const express = require('express');
const router = express();

router.use('/partner', require('./addPartner'));
router.use('/partner', require('./deletePartner'));
router.use('/partner', require('./updatePartner'));
router.use('/partner', require('./getPartners'));



module.exports = router;


