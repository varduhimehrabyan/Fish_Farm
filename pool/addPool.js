const express = require('express');
const router = express();
const pool = require('../database/db');
const pgFunctions = require('../pgFunctions');

router.use(express.json());

router.post('/addPool', async (req, res) => {
    console.log("addpool");
    const { name, height, width, maxweight } = req.body;
    await pool.query(pgFunctions.pool.usp_addPool, [name, height, width, maxweight]).then(
        res.status(200).send({ success: true})
    ) .catch (err => {
        console.log(err);
    })
    
})

module.exports = router