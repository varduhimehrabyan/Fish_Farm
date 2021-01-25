const express = require('express');
const router = express();
const pool = require('../../../database/db');
const pgFunctions = require('../../../pgFunctions');
const writeInLogs = require('../../../services/writeInLogsFile');
const tokenVerify = require('../../../middlewares/token/tokenVerify');

router.use(express.json());

// let date_ob = new Date();
// let date = ("0" + date_ob.getDate()).slice(-2);
// let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
// let year = date_ob.getFullYear();
// console.log(`'${year}-${month}-${date}'`);

router.post('/getReports', tokenVerify, async (req, res) => {
    const {date} = req.body
    // console.log(`'${year}-${month}-${date}'`);
    try {
        console.log("getReports");
        // const reports = await pool.query(pgFunctions.report.usp_getReports);
        const reports = await pool.query(pgFunctions.report.createreport, [date])
        // console.log(reports);
        // if(reports.rowCount == 0) {
        //     res.send({msg: 'Տվյալ ամսաթվի համար հաշվետվություններ չեն գտնվել:'})
        // } else {
            res.status(200).send({
                reports: reports.rows
            
            })
        // }
        
    }
    catch(err)  {
        writeInLogs(err);
    }
    
    
})

module.exports = router