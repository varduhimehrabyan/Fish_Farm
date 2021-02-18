const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const secret = global.env.secret;
const writeInLogs = require('../../services/writeInLogsFile')


const tokenVerify = async (req, res, next) => {
    try {
        if (req.headers.cookie) {
            let currentToken = req.cookies.token
            jwt.verify(currentToken, secret, function (err, decoded) {
                if (err) {
                    res.send({ success: false, msg: 'Token is not verified!' })
                } else {
                    decoded = jwt_decode(currentToken);
                    next()
                }
            })
        
        } else {
            res.send({ success: false, msg: 'No token' })
        }
    } catch (err) {
        writeInLogs(err)
        res.json(err)
    }
}


module.exports = tokenVerify