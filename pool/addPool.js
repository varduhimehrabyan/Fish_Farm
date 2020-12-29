const express = require('express');
const router = express();
const pool = require('../database/db');
const pgFunctions = require('../pgFunctions');
const writeInLogs = require('../services/writeInLogsFile');

router.use(express.json());

router.post('/addPool', async (req, res) => {
    try {
        console.log("addpool");
        const { name, height, width, maxweight } = req.body;
        await pool.query(pgFunctions.pool.usp_addPool, [name, height, width, maxweight]).then(
            res.status(200).send({ success: added.rows[0].success, errorMessage: added.rows[0].errorMessage,id: added.rows[0].id})
        ) .catch (err => {
            console.log(err);
        })
    }
    catch(err)  {
        writeInLogs(err);
    }
    
})

module.exports = router