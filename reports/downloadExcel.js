// const { Client } = require('pg')

// var Excel = require('exceljs');
// var workbook = new Excel.Workbook();

// const client = new Client({
//         user: 'postgres',
//         host: 'localhost',
//         database: 'Dzuk2',
//         password: 'windows7',
//         port: 5432,
// })


// client.connect()
// client.query('select "PoolId", "PoolName", "FishType", "InitialAvgWeight", "InitialQuantity", "InitialWeight", "InQuantity", "InWeight", "SaleQuantity", "SaleWeight", "MoveQuantity", "MoveWeight", "DeadQuantity", "DeadWeight", "FinalAvgWeight", "FinalQuantity", "FinalWeight", "PlusOrMinus", "Food", "WeightGrow", "Coefficient", "InsertedDate" from "Reports"', (err, data) => {
//     workbook.xlsx.readFile('qashach.xlsx')
//     .then(function() {
//         let worksheet = workbook.worksheets[0];
//         let rowIndex = 5;
//         let fishTypes = new Set()
//         let fishColors = {}
//         let i = 0
//         data.rows.forEach(rec => {
//             fishTypes.add(rec.FishType)
//             fishColors[Array.from(fishTypes)[i]] = colors[i]
//             i++
//         })
//         let date = new Date()
//         worksheet.getRow(1).getCell(2).value = date.getDate() + '.' + date.getMonth() + 1 + '.' + date.getFullYear()
//         data.rows.forEach( record => {
//             let columnIndex = 1;
//             var row = worksheet.getRow(rowIndex);
//             Object.keys(record ).forEach(columnName =>{
//                 row.getCell(columnIndex).value = record[columnName];
//                 columnIndex++;
//                 row.commit();
//             });
//             row.getCell(2).fill = {
//                 type: "pattern",
//                 pattern: "solid",
//                 fgColor: {
//                     argb: fishColors[record.FishType.toString()]
//                 },
//                 bgColor: {
//                     argb: fishColors[record.FishType.toString()]
//                 }
//             }
//             rowIndex++;
//         })

//         return workbook.xlsx.writeFile('new.xlsx')
//     }).catch((e)=>{console.log(e)})
//   client.end()
// })

// var colors = [
// "F8B00008",
// "FA52A2A8",
// "FB222228",
// "FDC143C8",
// "FFF00008",
// "FFF63478",
// "FFF7F508",
// "FCD5C5C8",
// "FF080808",
// "FE9967A8",
// "FFA80728",
// "FFFA07A8",
// "FFF45008",
// "FFF8C008",
// "FFFA5008",
// "FFFD7008",
// "FB8860B8",
// "FDAA5208",
// "FEEE8AA8",
// "FBDB76B8",
// "FF0E68C8",
// "F8080008",
// "FFFFF008",
// "F9ACD328",
// "F556B2F8",
// "F6B8E238",
// "F7CFC008",
// "F7FFF008",
// "FADFF2F8",
// "F0064008",
// "F0080008",
// "F228B228",
// "F00FF008",
// "F32CD328",
// "F90EE908",
// "F98FB988",
// "F8FBC8F8",
// "F00FA9A8",
// "F00FF7F8",
// "F2E8B578",
// "F66CDAA8",
// "F3CB3718",
// "F20B2AA8",
// "F2F4F4F8",
// "F0080808",
// "F008B8B8",
// "F00FFFF8",
// "F00FFFF8",
// "FE0FFFF8",
// "F00CED18",
// "F40E0D08",
// "F48D1CC8",
// "FAFEEEE8",
// "F7FFFD48",
// "FB0E0E68",
// "F5F9EA08",
// "F4682B48",
// "F6495ED8",
// "F00BFFF8",
// "F1E90FF8",
// "FADD8E68",
// "F87CEEB8",
// "F87CEFA8",
// "F1919708",
// "F0000808",
// "F00008B8",
// "F0000CD8",
// "F0000FF8",
// "F4169E18",
// "F8A2BE28",
// "F4B00828",
// "F483D8B8",
// "F6A5ACD8",
// "F7B68EE8",
// "F9370DB8",
// "F8B008B8",
// "F9400D38",
// "F9932CC8",
// "FBA55D38",
// "F8000808",
// "FD8BFD88",
// "FDDA0DD8",
// "FEE82EE8",
// "FFF00FF8",
// "FDA70D68",
// "FC715858",
// "FDB70938",
// "FFF14938",
// "FFF69B48",
// "FFFB6C18",
// "FFFC0CB8",
// "FFAEBD78",
// "FF5F5DC8",
// "FFFE4C48",
// "FFFEBCD8",
// "FF5DEB38",
// "FFFF8DC8",
// "FFFFACD8",
// "FFAFAD28",
// "FFFFFE08",
// "F8B45138",
// "FA0522D8",
// "FD2691E8",
// "FCD853F8",
// "FF4A4608",
// "FDEB8878",
// "FD2B48C8",
// "FBC8F8F8",
// "FFFE4B58",
// "FFFDEAD8",
// "FFFDAB98",
// "FFFE4E18",
// "FFFF0F58",
// "FFAF0E68",
// "FFDF5E68",
// "FFFEFD58",
// "FFFF5EE8",
// "FF5FFFA8",
// "F7080908",
// "F7788998",
// "FB0C4DE8",
// "FE6E6FA8",
// "FFFFAF08",
// "FF0F8FF8",
// "FF8F8FF8",
// "FF0FFF08",
// "FFFFFF08",
// "FF0FFFF8",
// "FFFFAFA8",
// "F6969698",
// "F8080808",
// "FA9A9A98",
// "FC0C0C08",
// "FD3D3D38",
// "FDCDCDC8",
// "FF5F5F58",
// ]