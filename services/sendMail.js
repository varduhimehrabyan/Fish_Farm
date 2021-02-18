// const express = require('express');
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const writeInLogs = require("../services/writeInLogsFile");

const router = express();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(express.json());

const htmlForm = `<div style="font - family: verdana; max-width:500px; margin-left">
                    <p style="color:blue"><i>Here must be Verification URL</i></p>
                </div>`;

const sendMail = async (mail) => {
  try {
    let transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "test.fish.farm@gmail.com",
        pass: "fishFarmTest777",
      },
    });

    transporter.sendMail(
      {
        from: "test.fish.farm@gmail.com",
        to: `${mail}`,
        subject: "Հաշվետվությունները թարմացվել են։",
        html: htmlForm,
      },
      (err) => {
        if (err) {
          writeInLogs("error to send mail")
        } else {
          res.send("Mail sent!");
        }
      }
    );
  } catch (err) {
    writeInLogs(err.message);
    res.send({ success: false });
  }
};

module.exports = sendMail;
