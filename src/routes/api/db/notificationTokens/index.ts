import express from "express";
import controller from "../../../../controllers/api/db/notificationTokens";
import { parseQueryParamsToDBOptions } from "../../../../middleware";
import { asyncWrapper } from "../../../../wrappers";

const router = express.Router();

router.get(
  "/",
  [parseQueryParamsToDBOptions],
  asyncWrapper(controller.getNotificationTokens)
);
router.get("/:id", asyncWrapper(controller.getNotificationTokenByPK));
router.post("/", asyncWrapper(controller.postNotificationToken));
router.delete(
  "/",
  [parseQueryParamsToDBOptions],
  asyncWrapper(controller.deleteNotificationTokens)
);

export default router;
