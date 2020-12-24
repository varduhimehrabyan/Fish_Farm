const express = require('express');
const router = express();
const pool = require('../../database/db');
const pgFunctions = require('../../pgFunctions');
const writeInLogs = require('../../services/writeInLogsFile');

router.use(express.json());

router.put('/updateFish', async (req, res) => {
    try {
        console.log("updateFish");
        const { id, name, description } = req.body;
        await pool.query(pgFunctions.fish.usp_updateFish, [id, name, description]).then(
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