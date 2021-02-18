const express = require("express");
const router = express();
const Excel = require("exceljs");
let workbook = new Excel.Workbook();
const writeInLogs = require("../../../services/writeInLogsFile");
const tokenVerify = require("../../../middlewares/token/tokenVerify");

router.use(express.json());

router.get("/download", tokenVerify, (req, res) => {
  res.download(__dirname + "/" + "քաշաճ.xlsx", (err) => {
    if (err) {
      writeInLogs(err)
    }
  });
});

router.post("/download", tokenVerify, async (req, res) => {
  try {
    workbook.xlsx
      .readFile("qashach.xlsx")
      .then(function () {
        let worksheet = workbook.worksheets[0];
        let rowIndex = 5;
        let date = new Date();
        worksheet.getRow(1).getCell(3).value = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
        req.body.forEach((record) => {
          let columnIndex = 1;
          var row = worksheet.getRow(rowIndex);
          Object.keys(record).forEach((columnName) => {
            row.getCell(columnIndex).value = record[columnName];
            columnIndex++;
            row.commit();
          });
          rowIndex++;
        });
        workbook.xlsx.writeFile(__dirname + "/" + "քաշաճ.xlsx");
      })
      .then(() => {
        res.send({success: true});
      })
      .catch((e) => {
        writeInLogs(e);
      });
  } catch (err) {
    writeInLogs(err);
  }
});

module.exports = router;
