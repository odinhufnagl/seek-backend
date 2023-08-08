import express from "express";
import controller from "../../../controllers/api/functions/search";
import { asyncWrapper } from "../../../wrappers";

const router = express.Router();

router.get("/", asyncWrapper(controller.searchController));

export default router;
