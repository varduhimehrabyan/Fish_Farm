const express = require('express');
const router = express();
const pool = require('../../database/db');
const pgFunctions = require('../../pgFunctions');

router.use(express.json());

router.post('/addPartner', async (req, res) => {
    console.log("addpartner");
    const { name, description, phone } = req.body;
    await pool.query(pgFunctions.partner.usp_addPartner, [name, description, phone]).then(
        res.status(200).send({ success: true})
    ) .catch (err => {
        console.log(err);
    })
    
})

module.exports = router