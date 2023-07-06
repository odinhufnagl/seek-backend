import express from "express";
import controller from "../../../../controllers/api/db/messages";
import { parseQueryParamsToDBOptions } from "../../../../middleware";
import { asyncWrapper } from "../../../../wrappers";

const router = express.Router();

router.get(
  "/",
  [parseQueryParamsToDBOptions],
  asyncWrapper(controller.getMessages)
);
router.get("/:id", asyncWrapper(controller.getMessageByPK));
router.post("/", asyncWrapper(controller.postMessage));
export default router;
