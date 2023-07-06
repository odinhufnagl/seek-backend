import { Router } from "express";
import userAuthRoutes from "./users/index";

const authRouter = Router({ mergeParams: true });
authRouter.use("/users", userAuthRoutes);

export default authRouter;
