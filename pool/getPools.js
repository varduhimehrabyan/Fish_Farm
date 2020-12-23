const express = require('express');
const router = express();
const pool = require('../database/db');
const pgFunctions = require('../pgFunctions');

router.use(express.json());

router.get('/getPools', async (req, res) => {
    console.log("getpools");
    const allPools = await pool.query(pgFunctions.usp_getPools)
    console.log(allPools.rows),
    res.status(200).send({
        allPools: allPools.rows
    })
    
})

module.exports = router