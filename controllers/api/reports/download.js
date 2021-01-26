const express = require('express');
const pgFunctions = require('../../../pgFunctions');
const pool = require('../../../database/db');
const router = express();
const Excel = require('exceljs');
let workbook = new Excel.Workbook();

router.post('/download', async (req, res) => {
    const {data} = req.body
    console.log(data);
    try {

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
        res.download(__dirname + '/' +'new.xlsx', (err) => {
            if(err) {
                console.log("Error: ",err);
            }
        });
        // workbook.xlsx.writeFile(__dirname + '/' +'new.xlsx')

    }).then(()=> {
        res.download(__dirname + '/' +'new.xlsx', (err) => {
            if(err) {
                console.log("Error: ",err);
            }
        });
    })
    .catch((e)=>{console.log(e)})
    // console.log(__dirname);
    
    }
    catch(err)  {
        console.log(err);
    }
    
    
})

module.exports = router