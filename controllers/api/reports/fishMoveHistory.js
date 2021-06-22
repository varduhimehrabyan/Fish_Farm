const router = express();
const pool = require("../../../database/db");
const pgFunctions = require("../../../pgFunctions");
const writeInLogs = require("../../../services/writeInLogsFile");
const tokenVerify = require("../../../middlewares/tokenVerify");

router.use(express.json());

router.post("/fishMoveHistory", async (req, res) => {
  const { poolsForFilter, typesForFilter, startDate, endDate, currentPage } =
    req.body;
    let count = 0
  console.log("LINA", {
    poolsForFilter,
    typesForFilter,
    startDate,
    endDate,
    currentPage,
  });
  try {
    const data = await pool.query(
      pgFunctions.fishMoveHistory.usp_fishMoveHistory,
      [poolsForFilter, typesForFilter, startDate, endDate, currentPage - 1]
    );
    console.log({
      data: data.rows,
      count: data.rows.length === 0?0:data.rows[0].count,
    });
    res.send({
      data: data.rows,
      count: data.rows.length === 0?0:data.rows[0].count,
    });
  } catch (err) {
    writeInLogs(err);
  }
});

module.exports = router;
