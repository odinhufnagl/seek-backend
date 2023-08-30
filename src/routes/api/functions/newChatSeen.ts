import express from "express";
import controller from "../../../controllers/api/functions/newChatSeen";
import { verifyTokenMiddleware } from "../../../middleware";
import { asyncWrapper } from "../../../wrappers";

const router = express.Router();

router.post(
  "/",
  [verifyTokenMiddleware],
  asyncWrapper(controller.newChatSeenController)
);

export default router;
