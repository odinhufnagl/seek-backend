import express from "express";
import controller from "../../../../../controllers/api/db/users/chats";
import { parseQueryParamsToDBOptions } from "../../../../../middleware";
import { asyncWrapper } from "../../../../../wrappers";

const router = express.Router({ mergeParams: true });

router.get(
  "/",
  [parseQueryParamsToDBOptions],
  asyncWrapper(controller.getChats)
);

export default router;
