import express from "express";
import controller from "../../../controllers/api/functions/blockUser";
import { asyncWrapper } from "../../../wrappers";

const router = express.Router();

router.post("/", asyncWrapper(controller.blockUserController));
export default router;
