const express = require('express')
const request = require('request')

const router = express()
router.use(express.json())

const captchaSecretKey = process.env.CAPTCHA_SECRET_KEY

const captcha = (req, res, next) => {

    if (!req.body.captcha) {
        res.json({ "success": false, "msg": "Capctha is not checked" })
    } else {
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${captchaSecretKey}&response=${req.body.captcha}`
        request(verifyUrl, (err, body) => {
            if (err) {
            } else {
                body = JSON.parse(body)
                if (!body.success && body.success === undefined) {
                    res.json({ "success": false, "msg": "captcha verification failed" })
                }
                else if (body.score < 0.5) {
                    res.json({ "success": false, "msg": "you might be a bot, sorry!", "score": body.score });
                } else {
                    next()
                }
            }
        })
    }
}


module.exports = captcha




// const request = require('request');
// const secretKey = '6LecLQoaAAAAAKmMUxi8oCHUsUZnaSSzx32gr3lt';

// const captchaVerify = async (req, res) =>{
//     if(!req.body.captcha) {
//         return res.json({'msg': 'Cartcha token is undefined!'})
//     }

//     const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}`;
//     request(verifyUrl, (err, body) => {
//         if(err) {
//             console.log(err);
//         }
//         body = JSON.parse(body);

//         if(!body.success || body) {
//             return res.json({'msg': 'You might be a robot, sorry! You are banned!'});
//         }
//         return res.json({'msg': 'You have been verified!'})
//     });
// }

// module.exports = captchaVerify;