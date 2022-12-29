import express from "express";
import tagsController from "../controllers/tags";

import { parseQueryParamsToDBOptions } from "../middleware";

const router = express.Router();

router.get("/", [parseQueryParamsToDBOptions], tagsController.getTags);

export default router;
