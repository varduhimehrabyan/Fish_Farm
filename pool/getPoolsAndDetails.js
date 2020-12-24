const express = require('express');
const router = express();
const pool = require('../database/db');
const pgFunctions = require('../pgFunctions');

router.use(express.json());

router.get('/getPoolsAndDetails', async (req, res) => {
    console.log("getPoolsAndDetails");
    const allPools = await pool.query(pgFunctions.pool.usp_getPoolsAndDetails)
    //console.log(allPools.rows),
    res.status(200).send({
        allPools: allPools.rows
    })
    
})

module.exports = router