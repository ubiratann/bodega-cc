import  express from "express";
import UserController from "../controllers/user";
import AuthController from "../controllers/auth";
import authMiddleware from "../middlewares/auth";

const UserRouter = express.Router();

UserRouter.post("/", authMiddleware, new UserController().save);
UserRouter.post("/login", new AuthController().authenticate);

export default UserRouter;