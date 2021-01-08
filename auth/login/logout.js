const express = require('express');
const router = express();
const cookieParser = require('cookie-parser');
//const tokenVerify = require('../../middlewares/token/tokenVerify')
const writeInLogs = require('../../services/writeInLogsFile');
const tokenVerify = require('../../middlewares/token/tokenVerify');

router.use(express.json());
router.use(cookieParser());

router.post('/logout', tokenVerify, async (req, res) => {
    try {
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

    } 
    catch(err) {
        writeInLogs(err.message);
        res.send({success: false})
    }
    
})


module.exports = router;