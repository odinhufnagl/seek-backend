import express from "express";
import controller from "../../../controllers/api/functions/maps";
import { asyncWrapper } from "../../../wrappers";

const router = express.Router();

router.get("/country", asyncWrapper(controller.getCountryController));
router.get("/location", asyncWrapper(controller.getLocationController));
router.get("/search", asyncWrapper(controller.getLocationsBySearchController));
export default router;
