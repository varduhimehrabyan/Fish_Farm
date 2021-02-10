const express = require('express')
const router = express()
const path = require("path")

router.use(express.json())

router.use(express.static("client/fishFarm"))
router.get("*", (req, res) => {
res.sendFile(path.resolve(__dirname, "client", "fishFarm", "index.html"))
})


module.exports = router