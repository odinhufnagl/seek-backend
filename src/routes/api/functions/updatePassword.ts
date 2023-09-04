import express from "express";
import controller from "../../../controllers/api/functions/updatePassword";
import { asyncWrapper } from "../../../wrappers";

const router = express.Router();

router.post("/", asyncWrapper(controller.updatePasswordController));

export default router;
