import { Router } from "express";
import ProductController  from "../controllers/product";
import authMiddleware from "../middlewares/auth";

const ProductRouter = Router();

ProductRouter.get("/:page", authMiddleware, new ProductController().getAll);

ProductRouter.get("/category/:id/:page", authMiddleware, new ProductController().getByCategory);

ProductRouter.get("/price/higherThan/:value/:page", authMiddleware, new ProductController().getByHigherValue);

ProductRouter.get("/price/lowerThan/:value/:page", authMiddleware, new ProductController().getByLowerValue);

ProductRouter.get("/name/:name/:page", authMiddleware, new ProductController().getByName);

ProductRouter.post("/", authMiddleware, new ProductController().save);

ProductRouter.put("/updatePrice/:id", authMiddleware, new ProductController().updatePrice);

export default ProductRouter  ;