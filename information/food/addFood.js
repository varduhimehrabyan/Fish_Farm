const express = require('express');
const router = express();
const pool = require('../../database/db');
const pgFunctions = require('../../pgFunctions');
const writeInLogs = require('../../services/writeInLogsFile');


router.use(express.json());

router.post('/addFood', async (req, res) => {
    try {
        console.log("addfood");
        const { name, number, weigth, coefficient } = req.body;
        await pool.query(pgFunctions.food.usp_addFood, [name, number, weigth, coefficient]).then(
            res.status(200).send({ success: true})
        ) .catch (err => {
            writeInLogs(err);
            console.log(err);
        })
    }
    catch(err) {
        writeInLogs(err);
    }
    
    
})

module.exports = router