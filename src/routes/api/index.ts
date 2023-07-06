import { Router } from "express";
import { verifyTokenMiddleware } from "../../middleware";
import authRouter from "./auth";
import dbRouter from "./db";
import functionsRouter from "./functions";

const mainRouter = Router();
mainRouter.use("/auth", authRouter);
mainRouter.use("/f", functionsRouter);
mainRouter.use("/", [verifyTokenMiddleware], dbRouter);

export default mainRouter;
