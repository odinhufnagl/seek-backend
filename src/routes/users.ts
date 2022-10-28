import express from "express";
import { controllerGetUsers } from "../controllers";

const router = express.Router();

router.get("/", controllerGetUsers);

export default router;
