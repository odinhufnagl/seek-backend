import express from "express";
import controller from "../controllers/predictedUserJobRatings";

import { parseQueryParamsToDBOptions } from "../middleware";

const router = express.Router();

router.get(
  "/",
  [parseQueryParamsToDBOptions],
  controller.getPredictedUserJobRatings
);
router.post("/", controller.postPredictedUserJobRatings);

export default router;
