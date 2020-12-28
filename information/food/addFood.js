const express = require('express');
const router = express();
const pool = require('../../database/db');
const pgFunctions = require('../../pgFunctions');
const writeInLogs = require('../../services/writeInLogsFile');


router.use(express.json());

router.post('/addFood', async (req, res) => {
    try {
        console.log("addfood");
        const { name, number, weight, coefficient } = req.body;
        const added = await pool.query(pgFunctions.food.usp_addFood, [name, number, weight, coefficient])
        //.then(
            res.status(200).send({ success: added.rows[0].success, errorMessage: added.rows[0].errorMessage})
        // ) .catch (err => {
        //     writeInLogs(err);
        //     console.log(err);
        // })
    }
    catch(err) {
        writeInLogs(err);
    }
    
    
})

module.exports = router