import { Router } from "express";
import ReserveController from "../controllers/reserve";

const ReserveRouter = Router();

ReserveRouter.post("/", ReserveController .save);

export { ReserveRouter };