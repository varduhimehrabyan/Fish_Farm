const express = require('express');
const router = express();
const pool = require('../../database/db');
const pgFunctions = require('../../pgFunctions');
const writeInLogs = require('../../services/writeInLogsFile');


router.use(express.json());

router.put('/updatePartner', async (req, res) => {
    try {
        console.log("updatePartner");
        const { id, name, description, phone } = req.body;
        await pool.query(pgFunctions.partner.usp_updatePartner, [id, name, description, phone]).then(
            res.status(200).send({ success: true})
        ) .catch (err => {
            console.log(err);
            writeInLogs(err);
        })
    }
    catch(err)  {
        writeInLogs(err);
    }
    
    
})

module.exports = router