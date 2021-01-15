const express = require('express');
const router = express();
const pool = require('../database/db');
const pgFunctions = require('../pgFunctions');
const writeInLogs = require('../services/writeInLogsFile');
const tokenVerify = require('../middlewares/token/tokenVerify');

router.use(express.json());

router.get('/getReports', tokenVerify, async (req, res) => {
    try {
        console.log("getReports");
        // const reports = await pool.query(pgFunctions.report.usp_getReports);
        const reports = await pool.query(pgFunctions.report.usp_example, ['2020-12-25', '2021-01-15'])
            res.status(200).send({
                reports: reports.rows
            })
        
        
    }
    catch(err)  {
        writeInLogs(err);
    }
    
    
})

module.exports = router