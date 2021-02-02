// const express = require('express');
const router = express();
const pool = require("../../../../database/db");
const pgFunctions = require("../../../../pgFunctions");
const writeInLogs = require("../../../../services/writeInLogsFile");
const tokenVerify = require("../../../../middlewares/token/tokenVerify");

router.use(express.json());

router.get("/getFoods", tokenVerify, async (req, res) => {
  try {
    const allFoods = await pool.query(pgFunctions.food.usp_getFoods);
    res.status(200).send({
      allFoods: allFoods.rows,
    });
  } catch (err) {
    writeInLogs(err);
  }
});

router.post("/addFood", tokenVerify, async (req, res) => {
  try {
    const { name, number, weight } = req.body;
    const added = await pool.query(pgFunctions.food.usp_addFood, [
      name,
      number,
      weight,
    ]);
    res
      .status(200)
      .send({
        success: added.rows[0].success,
        errorMessage: added.rows[0].errorMessage,
        id: added.rows[0].id,
      });
  } catch (err) {
    writeInLogs(err);
  }
});

router.post("/deleteFood", tokenVerify, async (req, res) => {
  try {
    const { id } = req.body;
    const result = await pool.query(pgFunctions.food.usp_deleteFood, [id]);
    res
      .status(200)
      .send({
        success: result.rows[0].success,
        errorMessage: result.rows[0].errormessage,
      });
  } catch (err) {
    writeInLogs(err);
  }
});

router.post("/updateFood", tokenVerify, async (req, res) => {
  try {
    const { id, name, number, weight } = req.body;
    const result = await pool.query(pgFunctions.food.usp_updateFood, [
      id,
      name,
      number,
      weight,
    ]);
    res
      .status(200)
      .send({
        success: result.rows[0].success,
        errorMessage: result.rows[0].errorMessage,
      });
  } catch (err) {
    writeInLogs(err);
  }
});

router.get("/getCoefficient", async (req, res) => {
  try {
    const allCoef = await pool.query(pgFunctions.food.usp_getCoefficient);
    res.status(200).send({
      allCoef: allCoef.rows,
    });
  } catch (err) {
    writeInLogs(err);
  }
});

router.post("/updateWeight", tokenVerify, async (req, res) => {
  console.log("object");
  try {
    // console.log(req.body);
    console.log("object1");
    const { id, weight, description, partnerid } = req.body;
    // console.log(parseInt(weight));
    const result = await pool.query(pgFunctions.food.usp_updateTheFood, [
      id,
      parseInt(weight),
      description,
      parseInt(partnerid),
    ]);
    console.log(result, "result");

    res.status(200).send({
      success: result.rows[0].success,
      errorMessage: result.rows[0].errorMessage,
    });
  } catch (err) {
    writeInLogs(err);
  }
});

module.exports = router;
