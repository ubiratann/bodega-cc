import  express from "express";
import UserController from "../controllers/user";

const UserRouter = express.Router();

UserRouter.post("/", new UserController().save);
UserRouter.post("/login", new UserController().login);

export default UserRouter;