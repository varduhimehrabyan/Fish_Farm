const express = require('express');
const router = express();
const pool = require('../../database/db');
const pgFunctions = require('../../pgFunctions');
const writeInLogs = require('../../services/writeInLogsFile');
const tokenVerify = require('../../middlewares/token/tokenVerify');

router.use(express.json());

router.post('/updateFish',tokenVerify,  async (req, res) => {
    try {
        console.log("updateFish");
        const { id, name, description } = req.body;
        const result = await pool.query(pgFunctions.fish.usp_updateFish, [id, name, description])
            res.status(200).send({ success: result.rows[0].success, errorMessage: result.rows[0].errorMessage})
        
    }
    catch(err) {
        writeInLogs(err);
    }
    
})

module.exports = router