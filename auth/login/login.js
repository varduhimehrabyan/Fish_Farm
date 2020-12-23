const express = require('express');
const router = express();
const bcrypt = require('bcrypt');
const pool = require('../../database/db');
const createToken = require('../token/createToken');
const pgFunctions = require('../../pgFunctions');
const writeInLogs = require('../../services/writeInLogsFile')

router.use(express.json());

router.post('/login', async (req, res) => {
    try {
        const { mail, password } = req.body
            const result = await pool.query(pgFunctions.usp_login, [`${mail}`])
            console.log(result);
            if(result.rowCount == 0) {
                console.log('Mail not found!');
                res.send({success: false})
            } else {
                console.log("password: ", result.rows[0].password);
                const correctPassword = await bcrypt.compare(password, result.rows[0].password)
                if(!correctPassword) {
                    console.log('Incorrect password!')
                    console.log(password);
                    res.send({ success: false})
                } 
                else {
                    createToken(res, mail, result.rows[0].id, result.rows[0].typeId)
                    console.log('User logged in!')
                    writeInLogs("login")
                    console.log("success: ", result.rows[0].success);
                    //console.log("type: ", typeof(result.rows[0].success));
                    res.send({success: true,
                        userType: `${result.rows[0].typeId}`})
                    
                }
            }

    } 
    catch(err) {
        writeInLogs(err)
        res.send({success: false,
        error: 'Mail not found!!'})
    }
  
});

module.exports = router;