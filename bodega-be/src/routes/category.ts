import { Router } from "express";
import { CategoryController } from "../controllers/category";
import authMiddleware from "../middlewares/auth";

const CategoryRouter = Router();

CategoryRouter.post("/", authMiddleware, new CategoryController().save);
CategoryRouter.get("/", authMiddleware, new  CategoryController().getAll)
export default CategoryRouter;