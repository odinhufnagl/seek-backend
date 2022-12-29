import express from "express";
import mapsController from "../controllers/maps";

const router = express.Router();

router.get("/search/cities", mapsController.searchCities);
router.get("/geocode/city", mapsController.getCityByCoordinate);
export default router;
