import { Router } from "express";
import ProductController  from "../controllers/product";

const ProductRouter = Router();

ProductRouter.get("/:page", new ProductController().getAll);

ProductRouter.get("/category/:id/:page", new ProductController().getByCategory);

ProductRouter.get("/price/higherThan/:value/:page", new ProductController().getByHigherValue);

ProductRouter.get("/price/lowerThan/:value/:page", new ProductController().getByLowerValue);

ProductRouter.get("/name/:name/:page", new ProductController().getByName);

ProductRouter.post("/", new ProductController().save);

// ProductRouter.delete("/:id", ProductController.remove);

ProductRouter.put("/updatePrice/:id", new ProductController().updatePrice);

export default ProductRouter  ;