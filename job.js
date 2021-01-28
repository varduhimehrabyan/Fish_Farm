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

    cron.schedule('0 44 11 * * *', async () => {
        try {
            const reports = await pool.query(pgFunctions.report.usp_createReport, [currentDate]);
            // for(i = 0; i < reports.rowCount; i++) {
            //     await pool.query(`INSERT INTO "Reports"("PoolName", "FishType","InitialAvgWeight", "InitialQuantity", 
            //     "InitialWeight", "InQuantity", "InWeight", "SaleQuantity", "SaleWeight",
            //     "MoveQuantity", "MoveWeight", "DeadQuantity", "DeadWeight",
            //     "FinalAvgWeight", "FinalQuantity", "FinalWeight", "PlusOrMinusQuantity", "PlusOrMinusWeight",
            //     "Food", "WeightGrow", "Coefficient") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,
            //         $15, $16, $17, $18, $19, $20, $21)`, [
            //         i.PoolName, i.FishType,i.InitialAvgWeight,i.InitialQuantity,i.InitialWeight,
            //         i.InQuantity,i.InWeight,i.SaleQuantity,i.SaleWeight,i.MoveQuantity,
            //         i.MoveWeight,i.DeadQuantity,i.DeadWeight,i.FinalAvgWeight,i.FinalQuantity,
            //         i.FinalWeight,i.PlusOrMinusQuantity,i.PlusOrMinusWeight,i.Food,i.WeightGrow,i.Coefficient
            //         ])
            // }
            console.log(reports.rows);
            console.log("Schedule running!");
    
        } 
        catch(err) {
            writeInLogs(err)
        }
        
      });
}
