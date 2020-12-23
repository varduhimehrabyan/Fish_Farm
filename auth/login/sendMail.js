// const express = require('express');
// const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
// const pool = require('../../database/db');

// const router = express();

// router.use(bodyParser.urlencoded({ extended: false}));
// router.use(express.json())

// router.post('/sendMail', async (req, res) => {
    
//     const { mail } = req.body
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//       host: "smtp.ethereal.email",
//       port: 587,
//       secure: false, // true for 465, false for other ports
//       service: "gmail",
//       auth: {
//         user: 'test.fish.farm@gmail.com', // generated ethereal user
//         pass: 'fishFarmTest777', // generated ethereal password
//       },
//       tls: {
//           rejectUnauthorized: false
//       }
//     });
  
//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: '"Administration of Fish farm" <test.fish.farm@gmail.com>', // sender address
//       to: `${mail}`, // list of receivers
//     });
//     console.log(info);
// })

// module.exports = router