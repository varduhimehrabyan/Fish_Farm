const express = require('express');
const router = express();
const pool = require('../../database/db');
const pgFunctions = require('../../pgFunctions');

router.use(express.json());

router.get('/getFishes', async (req, res) => {
    console.log("getfishes");
    const allFishes = await pool.query(pgFunctions.fish.usp_getFishes)
    console.log(allFishes.rows),
    res.status(200).send({
        allFishes: allFishes.rows
    })
    
})

module.exports = router