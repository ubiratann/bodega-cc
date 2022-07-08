import { Router } from "express";
import SaleController  from "../controllers/sale";
import authMiddleware from "../middlewares/auth";

const SaleRouter = Router();

SaleRouter.post("/", authMiddleware, new SaleController().save);

export default SaleRouter;