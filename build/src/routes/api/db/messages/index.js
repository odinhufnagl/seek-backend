"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messages_1 = __importDefault(require("../../../../controllers/api/db/messages"));
const middleware_1 = require("../../../../middleware");
const wrappers_1 = require("../../../../wrappers");
const router = express_1.default.Router();
router.get("/", [middleware_1.parseQueryParamsToDBOptions], (0, wrappers_1.asyncWrapper)(messages_1.default.getMessages));
router.get("/:id", (0, wrappers_1.asyncWrapper)(messages_1.default.getMessageByPK));
router.post("/", (0, wrappers_1.asyncWrapper)(messages_1.default.postMessage));
exports.default = router;
