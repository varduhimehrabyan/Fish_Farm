const express = require('express');
const router = express();
const pool = require('../database/db');
const pgFunctions = require('../pgFunctions');
const writeInLogs = require('../services/writeInLogsFile');


router.use(express.json());

router.get('/getPoolsAndDetails', async (req, res) => {
    try {
        console.log("getPoolsAndDetails");
        const allPools = await pool.query(pgFunctions.pool.usp_getPoolsAndDetails)
        //console.log(allPools.rows),
        res.status(200).send({
            allPools: allPools.rows
        })
    }
    catch(err)  {
        writeInLogs(err);
    }
    
    
})

module.exports = router