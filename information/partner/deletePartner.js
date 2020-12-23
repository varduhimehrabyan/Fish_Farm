const express = require('express');
const router = express();
const pool = require('../../database/db');
const pgFunctions = require('../../pgFunctions');

router.use(express.json());

router.post('/deletePartner', async (req, res) => {
    console.log("deletePartner");
    const { id } = req.body;
    await pool.query(pgFunctions.partner.usp_deletePartner, [id]).then(
        res.status(200).send({ success: true})
    ) .catch (err => {
        console.log(err);
    })
    
})

module.exports = router