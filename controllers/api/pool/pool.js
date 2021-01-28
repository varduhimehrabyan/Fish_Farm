// const express = require('express');
const router = express();
const pool = require('../../../database/db');
const pgFunctions = require('../../../pgFunctions');
const writeInLogs = require('../../../services/writeInLogsFile');
const tokenVerify = require('../../../middlewares/token/tokenVerify');

router.use(express.json());

router.get('/getPools', tokenVerify, async (req, res) => {
    try {
        console.log("getPools");
        const allPools = await pool.query(pgFunctions.pool.usp_getPools);
        res.status(200).send({
            allPools: allPools.rows
        })
    }
    catch(err)  {
        writeInLogs(err);
    }
})


router.get('/getPoolsAndDetails', tokenVerify, async (req, res) => {
    try {
        console.log("getPoolsAndDetails");
        const allPools = await pool.query(pgFunctions.pool.usp_getPoolsAndDetails)
        res.status(200).send({
            allPools: allPools.rows
        })
    }
    catch(err)  {
        writeInLogs(err);
    }
    
})


router.post('/addPool', tokenVerify, async (req, res) => {
    try {
        console.log("addpool");
        const { name, fishName } = req.body;
        const added = await pool.query(pgFunctions.pool.usp_addPool, [name, fishName])
            console.log(added.rows[0].success)
            res.status(200).send({ success: added.rows[0].success, errorMessage: added.rows[0].errorMessage,id: added.rows[0].id})
    }
    catch(err)  {
        writeInLogs(err);
    }
    
})

router.post('/deletePool', tokenVerify, async (req, res) => {
    try {
        console.log("deletepool");
        const id = req.body.id;
        const result = await pool.query(pgFunctions.pool.usp_deletePool, [id])
        res.status(200).send({ success: result.rows[0].success, errorMessage: result.rows[0].errorMessage})
        
    }
    catch(err)  {
        writeInLogs(err);
    }
    
})


router.post('/updatePool', tokenVerify, async (req, res) => {
    try {
        console.log("updatepools");
        const { id, name, fishName } = req.body;
        const result = await pool.query(pgFunctions.pool.usp_updatePool, [id, name, fishName])
        res.status(200).send({ success: result.rows[0].success, errorMessage: result.rows[0].errorMessage})
    }
    catch(err)  {
        writeInLogs(err);
    }
    

})


module.exports = router