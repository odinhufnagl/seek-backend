"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chats_1 = __importDefault(require("../../../../../controllers/api/db/users/chats"));
const middleware_1 = require("../../../../../middleware");
const wrappers_1 = require("../../../../../wrappers");
const router = express_1.default.Router({ mergeParams: true });
router.get("/", [middleware_1.parseQueryParamsToDBOptions], (0, wrappers_1.asyncWrapper)(chats_1.default.getChats));
router.get("/new", [middleware_1.parseQueryParamsToDBOptions], (0, wrappers_1.asyncWrapper)(chats_1.default.getNewChat));
exports.default = router;
