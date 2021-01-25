const express = require('express');
const router = express();
const pool = require('../../../../database/db');
const pgFunctions = require('../../../../pgFunctions');
const writeInLogs = require('../../../../services/writeInLogsFile');
const tokenVerify = require('../../../../middlewares/token/tokenVerify');

router.use(express.json());

router.post('/addPartner', tokenVerify, async (req, res) => {
    try {
        console.log("addpartner");
        const { name, description, phone } = req.body;
        const added = await pool.query(pgFunctions.partner.usp_addPartner, [name, description, phone])
            res.status(200).send({ success: added.rows[0].success, errorMessage: added.rows[0].errorMessage,id: added.rows[0].id})
        
    }
    catch(err)  {
        writeInLogs(err);
    }
    
})

module.exports = router