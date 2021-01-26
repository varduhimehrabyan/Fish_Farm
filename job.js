const cron = require('node-cron');
const pgFunctions = require('./pgFunctions');
const writeInLogs = require('./services/writeInLogsFile');
const sendMail = require('./services/sendMail');
//let shell = require('shelljs');

module.exports = () => {
    cron.schedule('0 00 15 * * *', async () => {
        try {
    //sendMail('zhorlev94@gmail.com');  
    // sendMail('varduhimehrabyan99@gmail.com');   
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
