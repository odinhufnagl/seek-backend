import express from "express";
import controller from "../../../controllers/api/functions/search";
import { verifyTokenMiddleware } from "../../../middleware";
import { asyncWrapper } from "../../../wrappers";

const router = express.Router();

router.get(
  "/",
  [verifyTokenMiddleware],
  asyncWrapper(controller.searchController)
);

export default router;
