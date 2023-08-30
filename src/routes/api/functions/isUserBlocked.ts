import express from "express";
import controller from "../../../controllers/api/functions/isUserBlocked";
import { verifyTokenMiddleware } from "../../../middleware";
import { asyncWrapper } from "../../../wrappers";

const router = express.Router();

router.get(
  "/",
  [verifyTokenMiddleware],
  asyncWrapper(controller.isUserBlockedController)
);
export default router;
