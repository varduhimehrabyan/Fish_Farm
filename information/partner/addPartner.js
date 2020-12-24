const express = require('express');
const router = express();
const pool = require('../../database/db');
const pgFunctions = require('../../pgFunctions');
const writeInLogs = require('../../services/writeInLogsFile');

router.use(express.json());

router.post('/addPartner', async (req, res) => {
    try {
        console.log("addpartner");
        const { name, description, phone } = req.body;
        await pool.query(pgFunctions.partner.usp_addPartner, [name, description, phone]).then(
            res.status(200).send({ success: true})
        ) .catch (err => {
            writeInLogs(err);
            console.log(err);
        })
    }
    catch(err)  {
        writeInLogs(err);
    }
    
})

module.exports = router