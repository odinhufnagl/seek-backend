import express from "express";
import authController from "../../../../controllers/api/auth/authUser";
import {
  checkUserDuplicateEmail,
  verifyTokenMiddleware,
} from "../../../../middleware";
import { asyncWrapper } from "../../../../wrappers";

const router = express.Router();

router.get(
  "/",
  [verifyTokenMiddleware],
  asyncWrapper(authController.authenticate)
);
router.post("/signin", asyncWrapper(authController.signIn));
router.post(
  "/signup",
  [asyncWrapper(checkUserDuplicateEmail)],
  asyncWrapper(authController.signUp)
);

export default router;
