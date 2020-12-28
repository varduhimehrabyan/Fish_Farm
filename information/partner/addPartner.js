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
        const added = await pool.query(pgFunctions.partner.usp_addPartner, [name, description, phone]).then(
            res.status(200).send({ success: added.rows[0].success, 
                errorMessage: added.rows[0].errorMessage,
                id: added.rows[0].id})
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