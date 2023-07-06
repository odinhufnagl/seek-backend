import express from "express";
import controller from "../../../../controllers/api/db/chats";
import { parseQueryParamsToDBOptions } from "../../../../middleware";
import { asyncWrapper } from "../../../../wrappers";

const router = express.Router();

router.get(
  "/",
  [parseQueryParamsToDBOptions],
  asyncWrapper(controller.getChats)
);
router.get("/:id", asyncWrapper(controller.getChatByPK));
router.post("/", asyncWrapper(controller.postChat));
export default router;
