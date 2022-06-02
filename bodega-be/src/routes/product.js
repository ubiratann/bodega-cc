const express           = require("express")
const router            = express.Router()
const productController = require("../controllers/product")

// 	#swagger.tags = ['Produto']
router.get("/", productController.getAll)

// 	#swagger.tags = ['Produto']
router.get("/category/:id", productController.getByCategory)

// 	#swagger.tags = ['Produto']
router.get("/price/higherThan/:value", productController.getByHigherValue)

// 	#swagger.tags = ['Produto']
router.get("/price/lowerThan/:value", productController.getByLowerValue)

// 	#swagger.tags = ['Produto']
router.get("/name/:name", productController.getByName)

// 	#swagger.tags = ['Produto']
router.post("/", productController.create)

// 	#swagger.tags = ['Produto']
router.delete("/:id", productController.delete)

// 	#swagger.tags = ['Produto']
router.put("/updatePrice/:id", productController.updatePrice)

// 	#swagger.tags = ['Produto']
router.put("/reserve/:id", productController.reserve)

module.exports = router