import { Router } from "express";
import fileUploadRouter from "./fileUpload";
import mapsRouter from "./maps";
import searchRouter from "./search";

const functionsRouter = Router({ mergeParams: true });
functionsRouter.use("/fileUpload", fileUploadRouter);
functionsRouter.use("/maps", mapsRouter);
functionsRouter.use("/search", searchRouter);

export default functionsRouter;
