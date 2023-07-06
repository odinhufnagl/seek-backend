import express from "express";
import controller from "../../../../../controllers/api/db/users/questions";
import { parseQueryParamsToDBOptions } from "../../../../../middleware";
import { asyncWrapper } from "../../../../../wrappers";

const router = express.Router({ mergeParams: true });

router.get(
  "/new",
  [parseQueryParamsToDBOptions],
  asyncWrapper(controller.getNewQuestion)
);

export default router;
