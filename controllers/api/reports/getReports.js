// const express = require('express');
const router = express();
const pool = require('../../../database/db');
const pgFunctions = require('../../../pgFunctions');
const writeInLogs = require('../../../services/writeInLogsFile');
const tokenVerify = require('../../../middlewares/token/tokenVerify');

router.use(express.json());


router.post('/getCurrentReports', tokenVerify, async (req, res) => {

const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month.toString().length == 1) {
    month = "0" + month;
  }
  const day = date.getDate();
  const currentDate = `'${year}-${month}-${day}'`;
    try {
        const reports = await pool.query(pgFunctions.report.usp_createReport, [currentDate])
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
        const reports = await pool.query(pgFunctions.report.usp_getReportForMonth, [parseInt(month), parseInt(year)])
            res.status(200).send({
                reports: reports.rows
            
            })
        
    }
    catch(err)  {
        writeInLogs(err);
    }
    
})


module.exports = router