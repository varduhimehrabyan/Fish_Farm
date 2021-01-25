const express = require('express');
const router = express();
const cookieParser = require('cookie-parser');
const writeInLogs = require('../../../services/writeInLogsFile');
const tokenVerify = require('../../../middlewares/token/tokenVerify');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const secret = process.env.secret

router.use(express.json());
router.use(cookieParser());

router.get('/token', async (req, res) => {
    console.log('tokenVerify endpoint')
    try {
        if (req.headers.cookie) {
            console.log(req.cookies);
            let currentToken = req.cookies.token
            jwt.verify(currentToken, secret, function (err, decoded) {
                if (err) {
                    res.send({ success: false, msg: 'Token is not verified!' })
                    console.log('Token is not verified!');
                } else {
                    console.log('Token verified!');
                    decoded = jwt_decode(currentToken);
                    console.log('Decoded token: ', decoded);
                    res.send({
                        success: true
                        // id: decoded.id, 
                        // typeId: decoded.typeId
                    })
                }
            })
        
        } else {
            res.send({ success: false, msg: 'No token' })
        }
    } catch (err) {
        console.log('catch')
        res.json('err')
    }
})


module.exports = router;