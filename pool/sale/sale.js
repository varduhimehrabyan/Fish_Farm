const pgFunctions = require('../../pgFunctions');
const express = require('express');
const pool = require('../../database/db')
const router = express();
const writeInLogs = require('../../services/writeInLogsFile');


router.use(express.json());

router.post('/sales/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { quantity, weight, avgWeight, partnerId, description } = req.body;
        const result = await pool.query(pgFunctions.pool.sale.usp_fishOut, [id, quantity, weight, avgWeight, partnerId, description]);
        console.log(result);
        res.send({success: result.success});
    }
    catch(err) {
        writeInLogs(err)
    }
    
})

module.exports = router;
