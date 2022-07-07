import { Router } from "express";
import ReserveController from "../controllers/reserve";
import { Reserve } from "../models/reserve";

const ReserveRouter = Router();

ReserveRouter.post("/", new ReserveController().save);
ReserveRouter.get("/:userId", new ReserveController().get);

export default ReserveRouter;