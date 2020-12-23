// const express = require('express');
// const router = express();
// //const jwt = require('jsonwebtoken');
// //const bcrypt = require('bcrypt');
// const pool = require('../../database/db');
// //const createToken = require('../token/createToken');
// const nodemailer = require("nodemailer");

// router.use(express.json());

// const secret = process.env.secret;

// router.post('/recoverPassword', async (req, res) => {
//     try {
//         const { mail } = req.body
//         //receive mail parameter
//             await pool.query(`select * from users where mail = $1`, [mail])
//             //ensure the mail exists in db 
//             .then(async (response) => {
//                 console.log(response);
//             //return error object
//             const result = JSON.parse(response);
//             if(result == null || result.Table == null) {
//                 res.send({error: 'MAIL_NOT_FOUND'})
//             } else {
//                 //create mail variables
//                 const fromAddress = 'test.fish.farm@gmail.com' 
//             }

//             });

//     } catch {
//         res.send({error: "Can not find mail!"})
//     }
// });

// const createToken = function(res, mail) {
//     try {
//         const token = jwt.sign({ mail: mail }, secret);
//         console.log("token: ", token)
//          res.cookie('token', token, {
//             httpOnly: true,
//             });
//     } catch(err) {
//         console.log('errr')
//         console.log(err);
//     }
// }


// module.exports = router;