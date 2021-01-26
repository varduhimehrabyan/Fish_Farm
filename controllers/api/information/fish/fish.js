const express = require('express');
const router = express();
const pool = require('../../../../database/db');
const pgFunctions = require('../../../../pgFunctions');
const writeInLogs = require('../../../../services/writeInLogsFile');
const tokenVerify = require('../../../../middlewares/token/tokenVerify');

router.use(express.json());

router.get('/getFishes', tokenVerify, async (req, res) => {
    try {
        console.log("getfishes");
        const allFishes = await pool.query(pgFunctions.fish.usp_getFishes)
            console.log(allFishes.rows),
            res.status(200).send({
                allFishes: allFishes.rows
            })
    
    }
    catch(err) {
        writeInLogs(err);
    }
    
    
})


router.post('/addFish', tokenVerify, async (req, res) => {
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


router.post('/deleteFish',tokenVerify, async (req, res) => {
    try {
        console.log("deletefish");
        const { id } = req.body;
        const result = await pool.query(pgFunctions.fish.usp_deleteFish, [id])
        res.status(200).send({ success: result.rows[0].success, errorMessage: result.rows[0].errormessage})
        
    } 
    catch(err) {
        writeInLogs(err);
    }
    
    
})

router.post('/updateFish',tokenVerify,  async (req, res) => {
    try {
        console.log("updateFish");
        const { id, name, description } = req.body;
        const result = await pool.query(pgFunctions.fish.usp_updateFish, [id, name, description])
            res.status(200).send({ success: result.rows[0].success, errorMessage: result.rows[0].errorMessage})
        
    }
    catch(err) {
        writeInLogs(err);
    }
    
})

module.exports = router