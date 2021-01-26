// const express = require('express');
const router = express();
const pool = require('../../../database/db');
const pgFunctions = require('../../../pgFunctions');
const writeInLogs = require('../../../services/writeInLogsFile');
const tokenVerify = require('../../../middlewares/token/tokenVerify');

router.use(express.json());


router.post('/getCurrentReports', tokenVerify, async (req, res) => {
    const {date} = req.body
    try {
        console.log("getReports");
        const reports = await pool.query(pgFunctions.report.createreport, [date])
            res.status(200).send({
                reports: reports.rows
            
            })
        
    }
    catch(err)  {
        writeInLogs(err);
    }
    
})


router.post('/getReportsForMonth', tokenVerify, async (req, res) => {
    const {month, year} = req.body
    try {
        console.log("getReportsForMonth");
        const reports = await pool.query(pgFunctions.report.usp_getReportForMonth, [parseInt(month), parseInt(year)])
        console.log(reports);
            res.status(200).send({
                reports: reports.rows
            
            })
        
    }
    catch(err)  {
        writeInLogs(err);
    }
    
})


module.exports = router