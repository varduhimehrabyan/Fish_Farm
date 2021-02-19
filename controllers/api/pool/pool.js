// const express = require('express');
const router = express();
const pool = require('../../../database/db');
const pgFunctions = require('../../../pgFunctions');
const writeInLogs = require('../../../services/writeInLogsFile');
const tokenVerify = require('../../../middlewares/tokenVerify');

router.use(express.json());

router.get('/getPools', tokenVerify, async (req, res) => {
    try {
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
        const { name, fishName } = req.body;
        const added = await pool.query(pgFunctions.pool.usp_addPool, [name, fishName])
            res.status(200).send({ success: added.rows[0].success, errorMessage: added.rows[0].errorMessage,id: added.rows[0].id})
    }
    catch(err)  {
        writeInLogs(err);
    }
    
})

router.post('/deletePool', tokenVerify, async (req, res) => {
    try {
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
        const { id, name, fishName } = req.body;
        const result = await pool.query(pgFunctions.pool.usp_updatePool, [id, name, fishName])
        res.status(200).send({ success: result.rows[0].success, errorMessage: result.rows[0].errorMessage})
    }
    catch(err)  {
        writeInLogs(err);
    }
})


router.post('/correct', tokenVerify, async (req, res) => {
    try {
        const { poolid , quantity , weight  } = req.body;
        const added = await pool.query(pgFunctions.pool.usp_correct, [poolid , quantity , weight])
            res.status(200).send({ success: added.rows[0].success, errorMessage: added.rows[0].errorMessage,id: added.rows[0].id})
    }
    catch(err)  {
        writeInLogs(err);
    }
    
})

router.post('/inPool', tokenVerify, async (req, res) => {
    try {
        const { toPoolid, quantity, weight, partnerId, description, date } = req.body;
        const result = await pool.query(pgFunctions.pool.entrance.usp_fishIn, [toPoolid, quantity, weight, partnerId, description, date])
            res.send({success: result.rows[0].success, errorMessage: result.rows[0].errorMessage});
        
    }
    catch(err) {
        writeInLogs(err)
    }
    
})

router.post('/movement', tokenVerify, async (req, res) => {
    try {
        const { fromPoolid, toPoolid, quantity , weight , description, date } = req.body;
        const result = await pool.query(pgFunctions.pool.movement.usp_fishMove, [fromPoolid, toPoolid, quantity, weight, description, date]);
        res.send({success: result.rows[0].success, errorMessage: result.rows[0].errorMessage});
    }
    catch(err) {
        writeInLogs(err)
    }
    
})

router.post('/undoFishMove', tokenVerify, async (req, res) => {
    try {
    const { id, action } = req.body;
    const result = await pool.query(pgFunctions.pool.movement.usp_undoFishMove, [id, action]);
    res.send({success: result.rows[0].success, errorMessage: result.rows[0].errorMessage});
    }
    catch(err) {
    writeInLogs(err)
    }
    
})

router.post('/sales', tokenVerify, async (req, res) => {
    try {
        const { fromPoolid, quantity, weight, partnerId, description, date } = req.body;
        const result = await pool.query(pgFunctions.pool.sale.usp_fishOut, [fromPoolid, quantity, weight, partnerId, description, date]);
        res.send({success: result.rows[0].success, errorMessage: result.rows[0].errorMessage});
    }
    catch(err) {
        writeInLogs(err)
    }
    
})

module.exports = router