import express from "express";
import controller from "../../../controllers/api/functions/unblockUser";
import { asyncWrapper } from "../../../wrappers";

const router = express.Router();

router.post("/", asyncWrapper(controller.unblockUserController));
export default router;
