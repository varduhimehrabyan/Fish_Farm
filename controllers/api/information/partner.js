// const express = require('express');
const router = express();
const pool = require('../../../database/db');
const pgFunctions = require('../../../pgFunctions');
const writeInLogs = require('../../../services/writeInLogsFile');
const tokenVerify = require('../../../middlewares/tokenVerify');


router.use(express.json());

router.get('/getPartners', tokenVerify, async (req, res) => {
    try {
        const allPartners = await pool.query(pgFunctions.partner.usp_getPartners)
            res.status(200).send({
                allPartners: allPartners.rows
            })
        
    }
    catch(err)  {
        writeInLogs(err);
    }
    
})


router.post('/addPartner', tokenVerify, async (req, res) => {
    try {
        const { name, description, phone } = req.body;
        const added = await pool.query(pgFunctions.partner.usp_addPartner, [name, description, phone])
            res.status(200).send({ success: added.rows[0].success, errorMessage: added.rows[0].errorMessage,id: added.rows[0].id})
        
    }
    catch(err)  {
        writeInLogs(err);
    }
    
})


router.post('/deletePartner', tokenVerify, async (req, res) => {
    try {
        const { id } = req.body;
        const result = await pool.query(pgFunctions.partner.usp_deletePartner, [id])
            res.status(200).send({ success: result.rows[0].success, errorMessage: result.rows[0].errorMessage})
        
    }
    catch(err)  {
        writeInLogs(err);
    }
    
})


router.post('/updatePartner', tokenVerify, async (req, res) => {
    try {
        const { id, name, description, phone } = req.body;
        const result = await pool.query(pgFunctions.partner.usp_updatePartner, [id, name, description, phone])
            res.status(200).send({ success: result.rows[0].success, errorMessage: result.rows[0].errorMessage})
        
    }
    catch(err)  {
        writeInLogs(err);
    }

    
})

module.exports = router