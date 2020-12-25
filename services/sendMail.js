const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const writeInLogs = require('../../services/writeInLogsFile');

const router = express();

router.use(bodyParser.urlencoded({ extended: false}));
router.use(express.json())

const htmlForm = `<div style="font - family: verdana; max-width:500px; margin-left">
                    <p style="color:blue"><i>Here must be Verification URL</i></p>
                </div>`

function sendMail() {
    try {
        const { mail } = req.body
        // create reusable transporter object using the default SMTP transport
        let transporter = await nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: 'test.fish.farm@gmail.com', // generated ethereal user
            pass: 'fishFarmTest777', // generated ethereal password
          },
        //   tls: {
        //       rejectUnauthorized: false
        //   }
        });
      
        // send mail with defined transport object
        transporter.sendMail({
          from: 'test.fish.farm@gmail.com', // sender address
          to: `${mail}`, // list of receivers
          subject: 'Verification link for <Fish Farm> company!',
          html: htmlForm
        }, (err) => {
            if(err) {
                console.log(err);
            } else {
                res.send('Mail sent!')
            }
        });
      }  
      catch(err) {
        writeInLogs(err.message);
        res.send({success: false})
    }
}

module.exports = sendMail