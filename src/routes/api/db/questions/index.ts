import express from "express";
import controller from "../../../../controllers/api/db/questions";
import { parseQueryParamsToDBOptions } from "../../../../middleware";
import { asyncWrapper } from "../../../../wrappers";

const router = express.Router();

router.get(
  "/",
  [parseQueryParamsToDBOptions],
  asyncWrapper(controller.getQuestions)
);
router.get("/:id", asyncWrapper(controller.getQuestionByPK));
router.post("/", asyncWrapper(controller.postQuestion));
export default router;
