const express = require('express');
const router = express();
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const pool = require('../../database/db');
const createToken = require('../token/createToken');
const pgFunctions = require('../../pgFunctions');
const tokenVerify = require('../../middlewares/token/tokenVerify')

router.use(express.json());
router.use(cookieParser());

router.post('/logout', async (req, res) => {
    const cookie = req.cookies
    console.log(cookie);
    for(let i in cookie) {
        if(!cookie.hasOwnProperty(i)) {
            console.log('Not logged in!');
            res.send({ success: false });
        } else {
            res.clearCookie("token")
            console.log('Logout success!');
            res.send({ success: true });
        }
    }
})


module.exports = router;