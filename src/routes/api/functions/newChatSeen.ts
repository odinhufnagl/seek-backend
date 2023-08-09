import express from "express";
import controller from "../../../controllers/api/functions/newChatSeen";
import { asyncWrapper } from "../../../wrappers";

const router = express.Router();

router.post("/", asyncWrapper(controller.newChatSeenController));

export default router;
