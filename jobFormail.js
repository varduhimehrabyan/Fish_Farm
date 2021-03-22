const cron = require("node-cron");
const pgFunctions = require("./pgFunctions");
const writeInLogs = require("./services/writeInLogsFile");
const sendMail = require("./services/sendMail");
const pool = require("./database/db");
const { exec } = require('child_process');

//let shell = require('shelljs');

module.exports = () => {
  cron.schedule("* * 15 * * 2", async () => {
    try {
      exec('pg_dump -h 127.0.0.1 -U dzukuser  -Fc Dzuk > /data/backup/Dzuk.backup', (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            console.log('error');
            return;
        }
        sendMail('argishtibejanyan@gmail.com');
      })   
 } catch (err) {
      writeInLogs(err);
    }
  });
};
