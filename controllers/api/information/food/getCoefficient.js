const express = require("express");
const router = express();
const pool = require('../../../../database/db');
const pgFunctions = require('../../../../pgFunctions');
const writeInLogs = require('../../../../services/writeInLogsFile');

router.use(express.json());

router.get("/getCoefficient", async (req, res) => {
  try {
    console.log("getCoefficient");
    const allCoef = await pool.query(pgFunctions.food.usp_getCoefficient);
    console.log(allCoef.rows),
      res.status(200).send({
        allCoef: allCoef.rows,
      });
  } catch (err) {
    writeInLogs(err);
  }
});

module.exports = router;