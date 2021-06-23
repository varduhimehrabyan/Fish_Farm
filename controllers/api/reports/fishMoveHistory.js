const router = express();
const pool = require("../../../database/db");
const pgFunctions = require("../../../pgFunctions");
const writeInLogs = require("../../../services/writeInLogsFile");
const tokenVerify = require("../../../middlewares/tokenVerify");

router.use(express.json());

router.post("/fishMoveHistory", async (req, res) => {
  const { poolsForFilter, typesForFilter, startDate, endDate, currentPage } =
    req.body;
  // console.log("LINA", {
  //   poolsForFilter,
  //   typesForFilter,
  //   startDate,
  //   endDate,
  //   currentPage,
  // });
  try {
    const data = await pool.query(
      pgFunctions.fishMoveHistory.usp_fishMoveHistory,
      [poolsForFilter, typesForFilter, startDate, endDate, currentPage - 1]
    );
    // console.log("DB",{
    //   data: data.rows,
    //   count: data.rows.length === 0?0:data.rows[0].count,
    // });
    res.send({
      data: data.rows,
      count: data.rows.length === 0 ? 0 : data.rows[0].count,
    });
  } catch (err) {
    writeInLogs(err);
  }
});

router.post("/updateMove", async (req, res) => {
  try {
    const { id, type, quantity, weight, partnerId, description } = req.body;
    // console.log({ id, type, quantity, weight, partnerId, description });
    const result = await pool.query(pgFunctions.fishMoveHistory.usp_editMove, [
      id,
      type,
      quantity,
      weight,
      partnerId,
      description,
    ]);
    res.send({
      success: result.rows[0].success,
      errorMessage: result.rows[0].errorMessage,
    });
  } catch (err) {
    writeInLogs(err);
  }
});

module.exports = router;
