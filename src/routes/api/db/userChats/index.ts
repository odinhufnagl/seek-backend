import express from "express";
import controller from "../../../../controllers/api/db/userChats";
import { parseQueryParamsToDBOptions } from "../../../../middleware";
import { asyncWrapper } from "../../../../wrappers";

const router = express.Router();

router.get(
  "/",
  [parseQueryParamsToDBOptions],
  asyncWrapper(controller.getUserChats)
);
router.get("/:id", asyncWrapper(controller.getUserChatByPK));
router.post("/", asyncWrapper(controller.postUserChat));
router.put("/:id", asyncWrapper(controller.putUserChat));
export default router;
