const express = require('express');
const router = express();
const pool = require('../database/db');
const pgFunctions = require('../pgFunctions');
const writeInLogs = require('../services/writeInLogsFile');


router.use(express.json());

router.get('/getPools', async (req, res) => {
    try {
        console.log("getPools");
        const allPools = await pool.query(pgFunctions.pool.usp_getPools);
        res.status(200).send({
            allPools: allPools.rows
        })
    }
    catch(err)  {
        writeInLogs(err);
    }
    
    
})

module.exports = router