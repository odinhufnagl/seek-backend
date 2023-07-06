import express from "express";
import controller from "../../../../controllers/api/db/readMessages";
import { parseQueryParamsToDBOptions } from "../../../../middleware";
import { asyncWrapper } from "../../../../wrappers";

const router = express.Router();

router.get(
  "/",
  [parseQueryParamsToDBOptions],
  asyncWrapper(controller.getReadMessages)
);
router.get("/:id", asyncWrapper(controller.getReadMessageByPK));
router.post("/", asyncWrapper(controller.postReadMessage));
export default router;
