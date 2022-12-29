import express from "express";
import controller from "../controllers/userJobRatings";

import { parseQueryParamsToDBOptions } from "../middleware";

const router = express.Router();

router.get("/", [parseQueryParamsToDBOptions], controller.getUserJobRatings);

export default router;
