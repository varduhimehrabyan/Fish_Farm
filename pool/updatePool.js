const express = require('express');
const router = express();
const pool = require('../database/db');
const pgFunctions = require('../pgFunctions');
const writeInLogs = require('../services/writeInLogsFile');


router.use(express.json());

router.post('/updatePool', async (req, res) => {
    try {
        console.log("updatepools");
        const { id, name, height, width, maxweight } = req.body;
        const result = await pool.query(pgFunctions.pool.usp_updatePool, [id, name, height, width, maxweight]).then(
            res.status(200).send({ success: result.rows[0].success, errorMessage: result.rows[0].errorMessage})
        ) .catch (err => {
            console.log(err);
        })
    }
    catch(err)  {
        writeInLogs(err);
    }
    
    
})

module.exports = router