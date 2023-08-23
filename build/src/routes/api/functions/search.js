"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const search_1 = __importDefault(require("../../../controllers/api/functions/search"));
const wrappers_1 = require("../../../wrappers");
const router = express_1.default.Router();
router.get("/", (0, wrappers_1.asyncWrapper)(search_1.default.searchController));
exports.default = router;
