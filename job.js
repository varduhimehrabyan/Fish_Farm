const cron = require('node-cron');
const pgFunctions = require('./pgFunctions');
const writeInLogs = require('./services/writeInLogsFile');
const pool = require('./database/db');

module.exports = () => {

    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month.toString().length == 1) {
        month = "0" + month;
    }
    const day = date.getDate();
    const currentDate = `'${year}-${month}-${day}'`;

    cron.schedule('0 44 14 * * *', async () => {
        try {
            
            console.log(reports.rows);
            console.log("Schedule running!");
    
        } 
        catch(err) {
            writeInLogs(err)
        }
        
      });
}
