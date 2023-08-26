import express from "express";
import controller from "../../../controllers/api/functions/isUserBlocked";
import { asyncWrapper } from "../../../wrappers";

const router = express.Router();

router.get("/", asyncWrapper(controller.isUserBlockedController));
export default router;
