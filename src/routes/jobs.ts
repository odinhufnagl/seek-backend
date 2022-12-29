import express from "express";
import userController from "../controllers/users";
import jobController from "../controllers/jobs";
import { parseQueryParamsToDBOptions } from "../middleware";

const router = express.Router();

router.get("/", [parseQueryParamsToDBOptions], jobController.getJobs);

export default router;
