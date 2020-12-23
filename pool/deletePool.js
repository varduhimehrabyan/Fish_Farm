const express = require('express');
const router = express();
const pool = require('../database/db');
const pgFunctions = require('../pgFunctions');

router.use(express.json());

router.post('/deletePool', async (req, res) => {
    console.log("deletepool");
    const { id } = req.body;
    await pool.query(pgFunctions.usp_deletepool, [id]).then(
        res.status(200).send({ success: true})
    ) .catch (err => {
        console.log(err);
    })
    
})

module.exports = router