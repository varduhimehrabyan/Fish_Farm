const express = require('express');
const router = express();
const pool = require('../database/db');
const pgFunctions = require('../pgFunctions');
const writeInLogs = require('../services/writeInLogsFile');


router.use(express.json());

router.post('/deletePool/:id', async (req, res) => {
    try {
        console.log("deletepool");
        //const { id } = req.params;
        await pool.query(pgFunctions.pool.usp_deletePool, [req.params.id]).then(
            res.status(200).send({ success: true})
        ) .catch (err => {
            console.log(err);
        })
    }
    catch(err)  {
        writeInLogs(err);
    }
    
})

module.exports = router