const express = require('express');
const router = express();
const pool = require('../../database/db');
const pgFunctions = require('../../pgFunctions');

router.use(express.json());

router.get('/getFoods', async (req, res) => {
    console.log("getfoods");
    const allFoods = await pool.query(pgFunctions.food.usp_getFoods)
    console.log(allFoods.rows),
    res.status(200).send({
        allFoods: allFoods.rows
    })
    
})

module.exports = router