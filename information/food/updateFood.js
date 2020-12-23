const express = require('express');
const router = express();
const pool = require('../../database/db');
const pgFunctions = require('../../pgFunctions');

router.use(express.json());

router.put('/updateFood', async (req, res) => {
    console.log("updateFood");
    const { id, name, number, weigth, coefficient } = req.body;
    await pool.query(pgFunctions.food.usp_updateFood, [id, name, number, weigth, coefficient]).then(
        res.status(200).send({ success: true})
    ) .catch (err => {
        console.log(err);
    })
    
})

module.exports = router