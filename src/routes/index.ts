import usersRoutes from "./users";
import { Router } from "express";

const mainRouter = Router();

mainRouter.use("/users", usersRoutes);

export default mainRouter;
