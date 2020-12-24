const pgFunctions = require('../../pgFunctions');
const express = require('express');
const pool = require('../../database/db')
const router = express();

router.use(express.json());

router.post('/sales/:id', async (req, res) => {
    const id = req.params.id;
    const { quantity, weight, avgWeight, partnerId, description } = req.body;
    //success , errorMessage
    const result = await pool.query(pgFunctions.pool.sale.usp_fishOut, [id, quantity, weight,avgWeight, partnerId, description]);
    console.log(result);
    res.send({success: true});
})

module.exports = router;
