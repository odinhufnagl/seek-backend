import usersRoutes from "./users";
import authRoutes from "./auth";
import { Router } from "express";

const mainRouter = Router();

mainRouter.use("/users", usersRoutes);
mainRouter.use("/auth", authRoutes);

export default mainRouter;
