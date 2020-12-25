const pgFunctions = require('../../pgFunctions');
const express = require('express');
const pool = require('../../database/db')
const router = express();
const writeInLogs = require('../../services/writeInLogsFile');


router.use(express.json());

router.post('/movement/:id', async (req, res) => {
    try {
        const fromPoolid = req.params.id;
        const { id, quantity, weight, avgWeight, partnerId, description } = req.body;
        const result = await pool.query(pgFunctions.pool.movement.usp_fishMove, [fromPoolid, id, quantity, weight, avgWeight, partnerId, description]);
        console.log(result);
        res.send({success: result.success});
    }
    catch(err) {
        writeInLogs(err)
    }
    
})

module.exports = router;
