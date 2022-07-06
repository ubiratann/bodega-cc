import { Router } from "express";
import UserTypeController from "../controllers/userType";

const UserTypeRouter = Router();
UserTypeRouter.post("/", new UserTypeController().save);

export  default UserTypeRouter ;