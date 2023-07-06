import express from "express";
import controller from "../../../../controllers/api/db/answers";
import { parseQueryParamsToDBOptions } from "../../../../middleware";
import { asyncWrapper } from "../../../../wrappers";

const router = express.Router();

router.get(
  "/",
  [parseQueryParamsToDBOptions],
  asyncWrapper(controller.getAnswers)
);
router.get("/:id", asyncWrapper(controller.getAnswerByPK));
router.post("/", asyncWrapper(controller.postAnswer));
export default router;
