const pgFunctions = require('../../pgFunctions');
const express = require('express');
const pool = require('../../database/db')
const router = express();
const writeInLogs = require('../../services/writeInLogsFile');


router.use(express.json());

router.post('/entrance', async (req, res) => {
    try {
        console.log("************************************");
        const { toPoolid, quantity, weight, avgWeight, partnerId, description } = req.body;
        const result = await pool.query(pgFunctions.pool.entrance.usp_fishIn, [toPoolid, quantity, weight, avgWeight, partnerId, description])
            console.log(result);
            res.send({success: result.rows[0].success,
                      errorMessage: result.rows[0].errorMessage});
        
    }
    catch(err) {
        writeInLogs(err)
    }
    
})

module.exports = router;