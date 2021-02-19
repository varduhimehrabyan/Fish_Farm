// const express = require("express");
const router = express();
const pool = require("../../../database/db");
const pgFunctions = require("../../../pgFunctions");
const writeInLogs = require("../../../services/writeInLogsFile");
const tokenVerify = require("../../../middlewares/tokenVerify");

router.use(express.json());

router.post("/addFeed", tokenVerify, async (req, res) => {
  try {
    const { addFood } = req.body;
    const added = await pool.query(pgFunctions.feeding.usp_feed, [addFood]);
    res.status(200).send({
      success: added.rows[0].success,
      errorMessage: added.rows[0].errorMessage,
      id: added.rows[0].id,
    });
  } catch (err) {
    writeInLogs(err);
  }
});

router.post("/addLosse", tokenVerify, async (req, res) => {
    try {
      const { addLosses } = req.body;
      const added = await pool.query(pgFunctions.losses.usp_loss, [addLosses]);
      res.status(200).send({
        success: added.rows[0].success,
        errorMessage: added.rows[0].errorMessage,
        id: added.rows[0].id,
      });
    } catch (err) {
      writeInLogs(err);
    }
  });

module.exports = router;