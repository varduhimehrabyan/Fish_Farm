const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const secret = process.env.secret

console.log("secret: ", secret);


const tokenVerify = async (req, res, next) => {
    console.log('tokenVerify')
    try {
        if (req.headers.cookie) {
            console.log(req.cookies.token);
            let currentToken = req.cookies.token
            jwt.verify(currentToken, secret, function (err, decoded) {
                if (err) {
                    res.send({ success: false, msg: 'Token is not verified!' })
                    console.log('Token is not verified!');
                } else {
                    console.log('Token verified!');
                    decoded = jwt_decode(currentToken);
                    console.log('Decoded token: ', decoded);
                    // res.send({
                    //     id: decoded.id, 
                    //     type: decoded.typeId
                    // })
                    next()
                }
            })
        
        } else {
            res.send({ success: false, msg: 'No token' })
        }
    } catch (err) {
        console.log('catch')
        res.json(err)
    }
}


module.exports = tokenVerify