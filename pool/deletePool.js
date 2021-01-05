const express = require('express');
const router = express();
const pool = require('../database/db');
const pgFunctions = require('../pgFunctions');
const writeInLogs = require('../services/writeInLogsFile');


router.use(express.json());

router.post('/deletePool', async (req, res) => {
    try {
        console.log("deletepool");
        const id = req.body.id;
        const result = await pool.query(pgFunctions.pool.usp_deletePool, [id])
            //res.status(200).send({ success: result.rows[0].success, errorMessage: result.rows[0].errorMessage})
            res.status(200).send({ success: result.rows[0].success, errorMessage: result.rows[0].errorMessage})
        
    }
    catch(err)  {
        writeInLogs(err);
    }
    
})

module.exports = router