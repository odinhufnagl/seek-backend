"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notificationTokens_1 = __importDefault(require("../../../../controllers/api/db/notificationTokens"));
const middleware_1 = require("../../../../middleware");
const wrappers_1 = require("../../../../wrappers");
const router = express_1.default.Router();
router.get("/", [middleware_1.parseQueryParamsToDBOptions], (0, wrappers_1.asyncWrapper)(notificationTokens_1.default.getNotificationTokens));
router.get("/:id", (0, wrappers_1.asyncWrapper)(notificationTokens_1.default.getNotificationTokenByPK));
router.post("/", (0, wrappers_1.asyncWrapper)(notificationTokens_1.default.postNotificationToken));
router.delete("/", [middleware_1.parseQueryParamsToDBOptions], (0, wrappers_1.asyncWrapper)(notificationTokens_1.default.deleteNotificationTokens));
exports.default = router;
