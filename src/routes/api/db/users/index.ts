import express from "express";
import userController from "../../../../controllers/api/db/users";
import { parseQueryParamsToDBOptions } from "../../../../middleware";
import { asyncWrapper } from "../../../../wrappers";
import chatsRoutes from "./chats";
import questionsRoutes from "./question";
const router = express.Router({ mergeParams: true });

router.use("/:id/chats", chatsRoutes);
router.use("/:id/questions", questionsRoutes);
router.get(
  "/",
  [parseQueryParamsToDBOptions],
  asyncWrapper(userController.getUsers)
);
router.get("/:id", asyncWrapper(userController.getUserByPK));
router.put("/:id", asyncWrapper(userController.putUser));

export default router;
