const fs = require('file-system');


function writeInLogs(message) {
  fs.open('../logs.txt', 'a', (err, fd) => {
    if(err) { 
        console.log('Cant open file'); 
    } else { 
        
        const date = new Date();
        const time = date.getTime();
        const year = date.getFullYear();
        const month = date.getMonth()+1; 
        if(month.toString().length == 1) {
            let month = '0'+ month;
        }
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        if(minute.toString().length == 1) {
            let minute = '0'+ minute;
        }

        const errorText = `${month}/${day}/${year} ${hour}:${minute} \n   Message: ${message} \n`

        console.log(errorText);
        
        fs.appendFile("./logs.txt", errorText , function (err) {
            if (err) console.log(err);
        })
    } 
}) 
}
//writeInLogs("error")

module.exports = writeInLogs;