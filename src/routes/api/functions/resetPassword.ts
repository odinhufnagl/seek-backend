import express from "express";
import controller from "../../../controllers/api/functions/resetPassword";
import { asyncWrapper } from "../../../wrappers";

const router = express.Router();

router.post("/", asyncWrapper(controller.resetPasswordController));

export default router;
