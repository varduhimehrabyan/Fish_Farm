const express = require('express');
const router = express();
const pool = require('../../database/db');
const pgFunctions = require('../../pgFunctions');
const writeInLogs = require('../../services/writeInLogsFile')

router.use(express.json());

router.post('/updateFood', async (req, res) => {
    try {
        console.log("updateFood");
        const { id, name, number, weight, coefficient } = req.body;
        const result = await pool.query(pgFunctions.food.usp_updateFood, [id, name, number, weight, coefficient])
            res.status(200).send({ success: result.rows[0].success, errorMessage: result.rows[0].errorMessage})
       
    }
    catch(err)  {
        writeInLogs(err);
    }
    
})

module.exports = router