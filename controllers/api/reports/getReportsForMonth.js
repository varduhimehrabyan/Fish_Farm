const express = require('express');
const router = express();
const pool = require('../../../database/db');
const pgFunctions = require('../../../pgFunctions');
const writeInLogs = require('../../../services/writeInLogsFile');
const tokenVerify = require('../../../middlewares/token/tokenVerify');

router.use(express.json());

router.post('/getReportsForMonth', tokenVerify, async (req, res) => {
    const {month, year} = req.body
    try {
        console.log("getReportsForMonth");
        const reports = await pool.query(pgFunctions.report.usp_getReportForMonth, [int(month), int(year)])
            res.status(200).send({
                reports: reports.rows
            
            })
        
    }
    catch(err)  {
        writeInLogs(err);
    }
    
    
})

module.exports = router