import express from "express";
import controller from "../../../controllers/api/functions/blockUser";
import { verifyTokenMiddleware } from "../../../middleware";
import { asyncWrapper } from "../../../wrappers";

const router = express.Router();

router.post(
  "/",
  [verifyTokenMiddleware],
  asyncWrapper(controller.blockUserController)
);
export default router;
