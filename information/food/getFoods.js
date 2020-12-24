const express = require('express');
const router = express();
const pool = require('../../database/db');
const pgFunctions = require('../../pgFunctions');
const writeInLogs = require('../../services/writeInLogsFile');

router.use(express.json());

router.get('/getFoods', async (req, res) => {
    try {
        console.log("getfoods");
        const allFoods = await pool.query(pgFunctions.food.usp_getFoods)
        console.log(allFoods.rows),
        res.status(200).send({
            allFoods: allFoods.rows
        })
    }
    catch(err)  {
        writeInLogs(err);
    }
    
})

module.exports = router