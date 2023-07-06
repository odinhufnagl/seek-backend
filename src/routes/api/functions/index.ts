import { Router } from "express";
import fileUploadRouter from "./fileUpload";
import mapsRouter from "./maps";

const functionsRouter = Router({ mergeParams: true });
functionsRouter.use("/fileUpload", fileUploadRouter);
functionsRouter.use("/maps", mapsRouter);

export default functionsRouter;
