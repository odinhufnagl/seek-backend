import { Router } from "express";
import blockUserRouter from "./blockUser";
import fileUploadRouter from "./fileUpload";
import isUserBlockedRouter from "./isUserBlocked";
import mapsRouter from "./maps";
import newChatSeenRouter from "./newChatSeen";
import resetPasswordRouter from "./resetPassword";
import searchRouter from "./search";
import unblockUserRouter from "./unblockUser";
import updatePasswordRouter from "./updatePassword";
const functionsRouter = Router({ mergeParams: true });
functionsRouter.use("/fileUpload", fileUploadRouter);
functionsRouter.use("/maps", mapsRouter);
functionsRouter.use("/search", searchRouter);
functionsRouter.use("/newChatSeen", newChatSeenRouter);
functionsRouter.use("/blockUser", blockUserRouter);
functionsRouter.use("/unblockUser", unblockUserRouter);
functionsRouter.use("/isUserBlocked", isUserBlockedRouter);
functionsRouter.use("/resetPassword", resetPasswordRouter);
functionsRouter.use("/updatePassword", updatePasswordRouter);
export default functionsRouter;
