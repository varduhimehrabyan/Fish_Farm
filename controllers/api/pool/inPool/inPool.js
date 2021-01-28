const pgFunctions = require('../../../../pgFunctions');
// const express = require('express');
const pool = require('../../../../database/db')
const router = express();
const writeInLogs = require('../../../../services/writeInLogsFile');
const tokenVerify = require('../../../../middlewares/token/tokenVerify');


router.use(express.json());

router.post('/inPool', tokenVerify, async (req, res) => {
    try {
        const { toPoolid, quantity, weight, avgWeight, partnerId, description } = req.body;
        const result = await pool.query(pgFunctions.pool.entrance.usp_fishIn, [toPoolid, quantity, weight, avgWeight, partnerId, description])
            res.send({success: result.rows[0].success, errorMessage: result.rows[0].errorMessage});
        
    }
    catch(err) {
        writeInLogs(err)
    }
    
})

module.exports = router;