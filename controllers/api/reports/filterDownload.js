const express = require("express");
const router = express();
const Excel = require("exceljs");
let workbook = new Excel.Workbook();
const writeInLogs = require("../../../services/writeInLogsFile");
const tokenVerify = require("../../../middlewares/tokenVerify");
const fs = require("fs");

let id = 0;

router.use(express.json());

router.get("/download/:name", tokenVerify, (req, res) => {
  res.download(
    __dirname + "/" + req.params.name + ".xlsx",
    "filterReport.xlsx",
    (err) => {
      if (err) {
        writeInLogs(err);
      }
      fs.unlinkSync(__dirname + "/" + req.params.name + ".xlsx");
    }
  );
  //res.on("finish", () => {
  //               fs.unlinkSync(__dirname + "/" + req.params.name + ".xlsx")
  //            })
});

router.post("/filterDownload", tokenVerify, async (req, res) => {
  try {
    workbook.xlsx
      .readFile("filterReport.xlsx")
      .then(function () {
        let worksheet = workbook.worksheets[0];
        let rowIndex = 5;
        let date = new Date();
        worksheet.getRow(1).getCell(3).value =
          date.getDate() +
          "." +
          (date.getMonth() + 1) +
          "." +
          date.getFullYear();
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
        return workbook.xlsx.writeFile(
          __dirname + "/" + id.toString() + ".xlsx"
        );
      })
      .then(() => {
        fs.chmodSync(__dirname + "/" + id.toString() + ".xlsx", 0777);
        res.send({ success: true, id: id.toString() });
        id++;
      })
      .catch((e) => {
        writeInLogs(e);
      });
  } catch (err) {
    writeInLogs(err);
  }
});

module.exports = router;
