import express from "express";
import authController from "../controllers/auth";
import { checkDuplicateEmail, verifyToken } from "../middleware";

const router = express.Router();

router.get("/", [verifyToken], authController.authenticate);
router.post("/signin", authController.signIn);
router.post("/signup", [checkDuplicateEmail], authController.signUp);

export default router;
