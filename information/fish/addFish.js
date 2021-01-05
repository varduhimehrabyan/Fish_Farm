const express = require('express');
const router = express();
const pool = require('../../database/db');
const pgFunctions = require('../../pgFunctions');
const writeInLogs = require('../../services/writeInLogsFile');

router.use(express.json());

router.post('/addFish', async (req, res) => {
    try {
        console.log("addfish");
        const { name, description } = req.body;
        const added = await pool.query(pgFunctions.fish.usp_addFish, [name, description])
            res.status(200).send({ success: added.rows[0].success, errorMessage: added.rows[0].errorMessage,id: added.rows[0].id})
        
    }
    catch(err) {
        writeInLogs(err);
    }
    
    
})

module.exports = router