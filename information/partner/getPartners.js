const express = require('express');
const router = express();
const pool = require('../../database/db');
const pgFunctions = require('../../pgFunctions');
const writeInLogs = require('../../services/writeInLogsFile');
const tokenVerify = require('../../middlewares/token/tokenVerify');


router.use(express.json());

router.get('/getPartners', tokenVerify, async (req, res) => {
    try {
        console.log("getPartners");
        const allPartners = await pool.query(pgFunctions.partner.usp_getPartners)
            console.log(allPartners.rows),
            res.status(200).send({
                allPartners: allPartners.rows
            })
        
    }
    catch(err)  {
        writeInLogs(err);
    }
    
})

module.exports = router