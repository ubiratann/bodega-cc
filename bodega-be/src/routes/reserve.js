const express           = require("express")
const router            = express.Router()
const reserveController = require("../controllers/reserve")

router.post("/", reserveController.create)

module.exports = router