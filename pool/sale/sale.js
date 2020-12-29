const pgFunctions = require('../../pgFunctions');
const express = require('express');
const pool = require('../../database/db')
const router = express();
const writeInLogs = require('../../services/writeInLogsFile');


router.use(express.json());

router.post('/sales', async (req, res) => {
    try {
        const { fromPoolid, quantity, weight, avgWeight, partnerId, description } = req.body;
        const result = await pool.query(pgFunctions.pool.sale.usp_fishOut, [fromPoolid, quantity, weight, avgWeight, partnerId, description]);
        console.log(result);
        res.send({success: result.rows[0].success});
    }
    catch(err) {
        writeInLogs(err)
    }
    
})

module.exports = router;
