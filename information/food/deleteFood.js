const express = require('express');
const router = express();
const pool = require('../../database/db');
const pgFunctions = require('../../pgFunctions');

router.use(express.json());

router.post('/deleteFood/:id', async (req, res) => {
    console.log("deletefood");
    const { id } = req.params;
    await pool.query(pgFunctions.food.usp_deleteFood, [id]).then(
        res.status(200).send({ success: true})
    ) .catch (err => {
        console.log(err);
    })
    
})

module.exports = router