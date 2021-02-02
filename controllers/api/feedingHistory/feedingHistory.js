// const express = require("express");
const router = express();
const pool = require("../../../database/db");
const pgFunctions = require("../../../pgFunctions");
const writeInLogs = require("../../../services/writeInLogsFile");
const tokenVerify = require("../../../middlewares/token/tokenVerify");

router.use(express.json());

router.post("/:id", tokenVerify, async (req, res) => {
  try {
    const { id } = req.params;
    const added = await pool.query(pgFunctions.feedHistory.usp_poolReportFood, [id]);
    res.status(200).send({
      success: added.rows[0].success
    });
  } catch (err) {
    writeInLogs(err);
  }
});

module.exports = router;