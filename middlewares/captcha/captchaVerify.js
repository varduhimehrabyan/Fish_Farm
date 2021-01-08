const express = require('express')
const request = require('request')

const router = express()
router.use(express.json())

const secretKey = process.env.captcha_secret_key
//const secretKey = '6LecLQoaAAAAAD5uQQ37dD5n-xh76rhIU4HFwlMR'

console.log(secretKey);

const captcha = (req, res, next) => {
    console.log(req.body.captcha);

    if (!req.body.captcha) {
        res.json({ "success": false, "msg": "Cartcha token is undefined!" })
    } else {
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}`
        request(verifyUrl, (err, body) => {
            console.log(body.success);
            if (err) {
                console.log(err);
            } else {
                if (!body.success && body.success === undefined) {
                    res.json({ "success": false, "msg": "captcha verification failed" })
                }
                else if (body.score < 0.5) {
                    res.json({ "success": false, "msg": "You might be a robot, sorry! You are banned!", "score": body.score });
                } else {
                    next()
                    res.json({'msg': 'You have been verified!'})
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