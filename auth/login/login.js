const express = require('express');
const router = express();
const bcrypt = require('bcrypt');
const pool = require('../../database/db');
const createToken = require('../token/createToken');
const pgFunctions = require('../../pgFunctions');
const writeInLogs = require('../../services/writeInLogsFile')
const captchaVerify = require('../../middlewares/captcha/captchaVerify')

router.use(express.json());

router.post('/login', async (req, res) => {
    try {
        // res.clearCookie("token");
        const { mail, password } = req.body
        if(mail && password) {
            const result = await pool.query(pgFunctions.auth.usp_login, [`${mail}`])
            console.log({success: result.rows[0].success,
            errorMessage: result.rows[0].errorMessage});
            if(result.rowCount == 0) {
                res.send({success: result.rows[0].success, errorMessage: result.rows[0].errorMessage})
            } else {
                const correctPassword = await bcrypt.compare(password, result.rows[0].password)
                if(!correctPassword) {
                    console.log('Incorrect password!')
                    res.send({success: false})
                } 
                else {
                    createToken(res, mail, result.rows[0].id, result.rows[0].typeId);
                    console.log('User logged in!');
                    console.log("success: ", result.rows[0].success);
                    console.log("cookies: ", req.cookies);
                    console.log({success: result.rows[0].success,
                        errorMessage: result.rows[0].errorMessage,
                        userType: `${result.rows[0].typeId}`});
                    res.send({success: result.rows[0].success,
                        errorMessage: result.rows[0].errorMessage,
                        userType: `${result.rows[0].typeId}`})
                    
                }
            }

    } else {
        console.log({success: false});
    }
        }
       
            
    catch(err) {
        writeInLogs(err);
        res.send({success: false})
    }
  
});

module.exports = router;