const fs = require('file-system');


function writeInLogs(message) {
    try {
        fs.open('../logs.txt', 'a', (err, fd) => {
            if(err) { 
                console.log('Cant open file'); 
            } else { 
                
                const date = new Date();
                const time = date.getTime();
                const year = date.getFullYear();
                let month = date.getMonth()+1; 
                if(month.toString().length == 1) {
                    month = '0'+ month;
                }
                const day = date.getDate();
                const hour = date.getHours();
                let minute = date.getMinutes();
                if(minute.toString().length == 1) {
                    minute = '0'+ minute;
                }
        
                const errorText = `${month}/${day}/${year}  ${hour}:${minute} \n  ${message} \n`
        
                //console.log(errorText);
                
                fs.appendFile("./logs.txt", errorText , function (err) {
                    if (err) console.log(err);
                })
            } 
        }) 
    }
    catch(err)  {
        writeInLogs(err);
    }
  
}

module.exports = writeInLogs;