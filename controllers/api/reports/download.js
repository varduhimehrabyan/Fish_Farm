const express = require('express');
const pgFunctions = require('../../../pgFunctions');
const pool = require('../../../database/db');
const router = express();
const Excel = require('exceljs');
let workbook = new Excel.Workbook();
const writeInLogs = require('../../../services/writeInLogsFile');

router.post('/download', async (req, res) => {
    const {reports} = req.body
    // console.log(req.body);
    try {

    workbook.xlsx.readFile('qashach.xlsx')
    .then(function() {

        let worksheet = workbook.worksheets[0];
        let rowIndex = 5;
        let date = new Date()
        worksheet.getRow(1).getCell(2).value = date.getDate() + '.' + date.getMonth() + 1 + '.' + date.getFullYear()
        reports.forEach( record => {
            let columnIndex = 1;
            var row = worksheet.getRow(rowIndex);
            Object.keys(record ).forEach(columnName =>{
                row.getCell(columnIndex).value = record[columnName];
                columnIndex++;
                row.commit();
            });
            rowIndex++;
        })
        // res.download(__dirname + '/' +'new.xlsx', (err) => {
        //     if(err) {
        //         writeInLogs("Error: ",err);
        //     }
        // });
        
        // workbook.xlsx.writeFile(__dirname + '/' +'xlsx')
        // return workbook.xlsx.write(res).then(function () {
        //     res.status(200).end();
        //   });

    }).then(()=> {
        
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          );
          res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + ".xlsx"
          );
        //   res.download(__dirname + '/' +'new.xlsx', (err) => {
        //     if(err) {
        //         writeInLogs("Error: ",err);
        //     }
        // });
        workbook.xlsx.write(res).then(function () {
            res.status(200).end();
          });
    })
    .catch((e)=>{writeInLogs(e)})
    
    }
    catch(err)  {
        writeInLogs(err);
    }
    
    
})

module.exports = router