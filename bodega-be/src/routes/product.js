const express           = require("express")
const router            = express.Router()
const productController = require("../controllers/product")

router.get("/", productController.getAll)

router.get("/category/:id", productController.getByCategory)

router.get("/price/higherThan/:value", productController.getByHigherValue)

router.get("/price/lowerThan/:value", productController.getByLowerValue)

router.get("/name/:name", productController.getByName)

router.post("/", productController.create)

router.delete("/:id", productController.delete)

router.put("/updatePrice/:id", productController.updatePrice)


module.exports = router