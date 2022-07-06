import { Router } from "express";
import ProductController  from "../controllers/product";

const ProductRouter = Router();

ProductRouter.get("/:page", ProductController.getAll);

ProductRouter.get("/category/:id/:page", ProductController.getByCategory);

ProductRouter.get("/price/higherThan/:value/:page", ProductController.getByHigherValue);

ProductRouter.get("/price/lowerThan/:value/:page", ProductController.getByLowerValue);

ProductRouter.get("/name/:name/:page", ProductController.getByName);

ProductRouter.post("/", ProductController.save);

// ProductRouter.delete("/:id", ProductController.remove);

ProductRouter.put("/updatePrice/:id", ProductController.updatePrice);

export default ProductRouter  ;