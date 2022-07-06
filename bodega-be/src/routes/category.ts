import { Router } from "express";
import { CategoryController } from "../controllers/category";

const CategoryRouter = Router();

CategoryRouter.post("/", new CategoryController().save);

export default CategoryRouter;