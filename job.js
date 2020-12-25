const cron = require('node-cron');
const pool = require('./database/db');
const pgFunctions = require('./pgFunctions');
const writeInLogs = require('./services/writeInLogsFile');
const fetch = require('node-fetch');
const request = require('request');
//let shell = require('shelljs');

cron.schedule('0 26 16 * * *', async () => {
    try {
        console.log('Schedule running');

        
        // const result = await pool.query(pgFunctions.pool.usp_getPoolsAndDetails)
        //     writeInLogs(result);
        //     console.log(result);
        
        // if(shell.exec('dir') !== 0) {
        //     console.log('Something went wrong');
        // }


    } 
    catch(err) {
        writeInLogs(err)
    }
    
  });