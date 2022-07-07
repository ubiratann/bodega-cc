import { Router } from "express";
import { CategoryController } from "../controllers/category";
import authMiddleware from "../middlewares/auth";

const CategoryRouter = Router();

CategoryRouter.post("/", authMiddleware, new CategoryController().save);

export default CategoryRouter;