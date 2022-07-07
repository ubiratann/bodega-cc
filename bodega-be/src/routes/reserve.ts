import { Router } from "express";
import ReserveController from "../controllers/reserve";

const ReserveRouter = Router();

ReserveRouter.post("/", new ReserveController() .save);

export { ReserveRouter };