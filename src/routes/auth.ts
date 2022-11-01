import express from "express";
import authController from "../controllers/auth";
import { checkDuplicateEmail, verifyTokenMiddleware } from "../middleware";

const router = express.Router();

router.get("/", [verifyTokenMiddleware], authController.authenticate);
router.post("/signin", authController.signIn);
router.post("/signup", [checkDuplicateEmail], authController.signUp);

export default router;
