// const express = require('express');
const router = express();
const pool = require("../../../database/db");
const pgFunctions = require("../../../pgFunctions");
const writeInLogs = require("../../../services/writeInLogsFile");
const tokenVerify = require("../../../middlewares/token/tokenVerify");

router.use(express.json());

router.post("/getCurrentReports", tokenVerify, async (req, res) => {
  try {
    const reports = await pool.query(pgFunctions.report.usp_createReport);
    // console.log(reports);
    res.send({
      reports: reports.rows,
    });
  } catch (err) {
    writeInLogs(err);
  }
});

router.post("/getReportsForMonth", tokenVerify, async (req, res) => {
  const { month, year } = req.body;
  // console.log(month, year);
  try {
    const reports = await pool.query(pgFunctions.report.usp_getReportForMonth, [
      parseInt(month),
      parseInt(year),
    ]);
    // console.log(reports);
    res.status(200).send({
      reports: reports.rows,
    });
  } catch (err) {
    writeInLogs(err);
  }
});

router.post("/confirmReport", tokenVerify, async (req, res) => {
  const { final } = req.body;
  // console.log("final::::::",final);
  try {
    const saveReports = await pool.query(pgFunctions.report.usp_saveReport, [
      final,
    ]);
    // console.log("saving::::: ",saveReports.rows[0].success);
    res.send({
      success: saveReports.rows[0].success,
    });
  } catch (err) {
    writeInLogs(err);
  }
});

module.exports = router;
