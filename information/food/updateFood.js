const express = require('express');
const router = express();
const pool = require('../../database/db');
const pgFunctions = require('../../pgFunctions');
const writeInLogs = require('../../services/writeInLogsFile')

router.use(express.json());

router.post('/updateFood', async (req, res) => {
    try {
        console.log("updateFood");
        const { id, name, number, weigth, coefficient } = req.body;
        await pool.query(pgFunctions.food.usp_updateFood, [id, name, number, weigth, coefficient]).then(
            res.status(200).send({ success: true})
        ) .catch (err => {
            writeInLogs(err);
            console.log(err);
        })
    }
    catch(err)  {
        writeInLogs(err);
    }
    
})

module.exports = router