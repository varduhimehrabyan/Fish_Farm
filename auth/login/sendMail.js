const express = require('express');
const bodyParser = require('body-parser');
const sendMail = require('../../services/sendMail');

const router = express();

router.use(bodyParser.urlencoded({ extended: false}));
router.use(express.json())

router.post('/sendMail', async (req, res) => {
  sendMail();
})

module.exports = router