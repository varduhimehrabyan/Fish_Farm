const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const secret = process.env.secret

console.log("secret: ", secret);


const tokenVerify = async (req, res, next) => {
    console.log('tokenVerify')
    try {
        if (req.headers.cookie) {
            let currentToken = req.headers.cookie.split('token=')[1]
            jwt.verify(currentToken, secret, function (err, decoded) {
                if (err) {
                    res.send({ success: false })
                    console.log('Token not verified!');
                } else {
                    console.log('Token verified!');
                    decoded = jwt_decode(currentToken);
                    console.log('Decoded token: ', decoded);
                    res.send({
                        id: decoded.id, 
                        type: decoded.typeId
                    })
                    next()
                }
            })
        
        } else {
            res.send('no token')
        }
    } catch (err) {
        console.log('catch')
        re.json(err)
    }
}


module.exports = tokenVerify