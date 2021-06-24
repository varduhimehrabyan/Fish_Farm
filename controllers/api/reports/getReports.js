// const express = require('express');
const router = express();
const pool = require("../../../database/db");
const pgFunctions = require("../../../pgFunctions");
const writeInLogs = require("../../../services/writeInLogsFile");
const tokenVerify = require("../../../middlewares/tokenVerify");

router.use(express.json());

router.post("/getCurrentReports", tokenVerify, async (req, res) => {
  try {
    const reports = await pool.query(pgFunctions.report.usp_createReport);
    res.send({
      reports: reports.rows,
    });
  } catch (err) {
    writeInLogs(err);
  }
});

router.post("/filterReports", tokenVerify, async (req, res) => {
  try {
    const { startDate, endDate, send } = req.body;
    let arr = [];
    for (i = 0; i < send.length; i++) {
      arr.push(send[i].value);
    }
    const data = await pool.query(pgFunctions.report.usp_filterForReport, [
      arr,
      startDate,
      endDate,
    ]);
    res.send({
      data: data.rows,
    });
  } catch (err) {
    writeInLogs(err);
  }
});

router.post("/getReportsForMonth", tokenVerify, async (req, res) => {
  const { month, year } = req.body;
  try {
    const reports = await pool.query(pgFunctions.report.usp_getReportForMonth, [
      parseInt(month),
      parseInt(year),
    ]);
    res.status(200).send({
      reports: reports.rows,
    });
  } catch (err) {
    writeInLogs(err);
  }
});

router.post("/confirmReport", tokenVerify, async (req, res) => {
  const { final } = req.body;
  try {
    const saveReports = await pool.query(pgFunctions.report.usp_saveReport, [
      final,
    ]);
    res.send({
      success: saveReports.rows[0].success,
    });
  } catch (err) {
    writeInLogs(err);
  }
});

module.exports = router;
