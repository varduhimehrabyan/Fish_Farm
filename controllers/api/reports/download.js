const express = require('express');
const pgFunctions = require('../../../pgFunctions');
const pool = require('../../../database/db');
const router = express();
const Excel = require('exceljs');
let workbook = new Excel.Workbook();
const writeInLogs = require('../../../services/writeInLogsFile')

router.post('/download', async (req, res) => {
    const {data} = req.body
    try {
        console.log("download");

    workbook.xlsx.readFile('qashach.xlsx')
    .then(function() {

        let worksheet = workbook.worksheets[0];
        let rowIndex = 5;
        let date = new Date()
        worksheet.getRow(1).getCell(2).value = date.getDate() + '.' + date.getMonth() + 1 + '.' + date.getFullYear()
        data.forEach( record => {
            let columnIndex = 1;
            var row = worksheet.getRow(rowIndex);
            Object.keys(record ).forEach(columnName =>{
                row.getCell(columnIndex).value = record[columnName];
                columnIndex++;
                row.commit();
            });
            rowIndex++;
        })

        workbook.xlsx.writeFile(__dirname + '/' +'new1.xlsx')

    }).then(()=> {
        res.download(__dirname + '/' +'new1.xlsx', (err) => {
            if(err) {
                console.log(err);
            }
        });
    })
    .catch((e)=>{console.log(e)})
    
    }
    catch(err)  {
        console.log(err);
        writeInLogs(err);
    }
    
    
})

module.exports = router
// router.listen(5000);
