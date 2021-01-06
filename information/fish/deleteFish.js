const express = require('express');
const router = express();
const pool = require('../../database/db');
const pgFunctions = require('../../pgFunctions');
const writeInLogs = require('../../services/writeInLogsFile');

router.use(express.json());

router.post('/deleteFish', async (req, res) => {
    try {
        console.log("deletefish");
        const { id } = req.body;
        const result = await pool.query(pgFunctions.fish.usp_deleteFish, [id])
        res.status(200).send({ success: result.rows[0].success, 
                            errorMessage: result.rows[0].errormessage})
        
    } 
    catch(err) {
        writeInLogs(err);
    }
    
    
})

module.exports = router