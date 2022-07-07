import { Router } from "express";
import UserTypeController from "../controllers/userType";
import authMiddleware from "../middlewares/auth";

const UserTypeRouter = Router();
UserTypeRouter.post("/", authMiddleware, new UserTypeController().save);

export  default UserTypeRouter ;