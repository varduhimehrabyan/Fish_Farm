const cron = require('node-cron');
const pgFunctions = require('./pgFunctions');
const writeInLogs = require('./services/writeInLogsFile');
const sendMail = require('./services/sendMail');
const pool = require('./database/db');

//let shell = require('shelljs');

module.exports = () => {
    cron.schedule('0 09 16 * * *', async () => {
        try {
    //sendMail('zhorlev94@gmail.com');  
    await pool.query(pgFunctions.report.usp_storeReport).then(
        sendMail('varduhimehrabyan99@gmail.com')
    )
    .catch(err => writeInLogs(err));
    console.log("Schedule running!");
            
            // if(shell.exec('dir') !== 0) {
            //     console.log('Something went wrong');
            // }
    
        } 
        catch(err) {
            writeInLogs(err)
        }
        
      });
}
