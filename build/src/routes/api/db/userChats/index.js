"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userChats_1 = __importDefault(require("../../../../controllers/api/db/userChats"));
const middleware_1 = require("../../../../middleware");
const wrappers_1 = require("../../../../wrappers");
const router = express_1.default.Router();
router.get("/", [middleware_1.parseQueryParamsToDBOptions], (0, wrappers_1.asyncWrapper)(userChats_1.default.getUserChats));
router.get("/:id", (0, wrappers_1.asyncWrapper)(userChats_1.default.getUserChatByPK));
router.post("/", (0, wrappers_1.asyncWrapper)(userChats_1.default.postUserChat));
router.put("/:id", (0, wrappers_1.asyncWrapper)(userChats_1.default.putUserChat));
exports.default = router;
