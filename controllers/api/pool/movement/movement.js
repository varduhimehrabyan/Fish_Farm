const pgFunctions = require('../../../../pgFunctions');
// const express = require('express');
const pool = require('../../../../database/db')
const router = express();
const writeInLogs = require('../../../../services/writeInLogsFile');
const tokenVerify = require('../../../../middlewares/token/tokenVerify');

router.use(express.json());

router.post('/movement', tokenVerify, async (req, res) => {
    try {
        const { fromPoolid, toPoolid, quantity , weight , forSend, description } = req.body;
        const result = await pool.query(pgFunctions.pool.movement.usp_fishMove, [fromPoolid, toPoolid, quantity , weight , forSend, description]);
        res.send({success: result.rows[0].success, errorMessage: result.rows[0].errorMessage});
    }
    catch(err) {
        writeInLogs(err)
    }
    
})

module.exports = router;
