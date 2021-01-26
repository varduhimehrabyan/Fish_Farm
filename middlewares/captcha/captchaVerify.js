const request = require('request')

const secretKey = process.env.captcha_secret_key

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