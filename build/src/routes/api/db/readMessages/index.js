"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const readMessages_1 = __importDefault(require("../../../../controllers/api/db/readMessages"));
const middleware_1 = require("../../../../middleware");
const wrappers_1 = require("../../../../wrappers");
const router = express_1.default.Router();
router.get("/", [middleware_1.parseQueryParamsToDBOptions], (0, wrappers_1.asyncWrapper)(readMessages_1.default.getReadMessages));
router.get("/:id", (0, wrappers_1.asyncWrapper)(readMessages_1.default.getReadMessageByPK));
router.post("/", (0, wrappers_1.asyncWrapper)(readMessages_1.default.postReadMessage));
exports.default = router;
