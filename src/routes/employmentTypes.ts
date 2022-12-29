import express from "express";
import eTypesController from "../controllers/employmentTypes";

import { parseQueryParamsToDBOptions } from "../middleware";

const router = express.Router();

router.get(
  "/",
  [parseQueryParamsToDBOptions],
  eTypesController.getEmploymentTypes
);

export default router;
