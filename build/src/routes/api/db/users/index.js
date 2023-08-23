"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../../../../controllers/api/db/users"));
const middleware_1 = require("../../../../middleware");
const wrappers_1 = require("../../../../wrappers");
const chats_1 = __importDefault(require("./chats"));
const question_1 = __importDefault(require("./question"));
const router = express_1.default.Router({ mergeParams: true });
router.use("/:id/chats", chats_1.default);
router.use("/:id/questions", question_1.default);
router.get("/", [middleware_1.parseQueryParamsToDBOptions], (0, wrappers_1.asyncWrapper)(users_1.default.getUsers));
router.get("/:id", (0, wrappers_1.asyncWrapper)(users_1.default.getUserByPK));
router.put("/:id", (0, wrappers_1.asyncWrapper)(users_1.default.putUser));
exports.default = router;
