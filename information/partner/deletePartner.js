const express = require('express');
const router = express();
const pool = require('../../database/db');
const pgFunctions = require('../../pgFunctions');
const writeInLogs = require('../../services/writeInLogsFile');


router.use(express.json());

router.post('/deletePartner', async (req, res) => {
    try {
        console.log("deletePartner");
        const { id } = req.body;
        const result = await pool.query(pgFunctions.partner.usp_deletePartner, [id])
            res.status(200).send({ success: result.rows[0].success, errorMessage: result.rows[0].errorMessage})
        
    }
    catch(err)  {
        writeInLogs(err);
    }
    
    
})

module.exports = router