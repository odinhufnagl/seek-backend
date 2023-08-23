"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const maps_1 = __importDefault(require("../../../controllers/api/functions/maps"));
const wrappers_1 = require("../../../wrappers");
const router = express_1.default.Router();
router.get("/country", (0, wrappers_1.asyncWrapper)(maps_1.default.getCountryController));
router.get("/location", (0, wrappers_1.asyncWrapper)(maps_1.default.getLocationController));
router.get("/search", (0, wrappers_1.asyncWrapper)(maps_1.default.getLocationsBySearchController));
exports.default = router;
