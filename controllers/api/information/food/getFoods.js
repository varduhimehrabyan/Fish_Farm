const express = require('express');
const router = express();
const pool = require('../../../../database/db');
const pgFunctions = require('../../../../pgFunctions');
const writeInLogs = require('../../../../services/writeInLogsFile');
const tokenVerify = require('../../../../middlewares/token/tokenVerify');


router.use(express.json());

router.get('/getFoods', tokenVerify, async (req, res) => {
    try {
        console.log("getFoods");
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