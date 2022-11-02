import express from "express";
import userController from "../controllers/users";
import { parseQueryParamsToDBOptions } from "../middleware";

const router = express.Router();

router.get("/", [parseQueryParamsToDBOptions], userController.getUsers);
router.get("/:id", userController.getUserByPK);
router.put("/:id", userController.putUser);

export default router;
