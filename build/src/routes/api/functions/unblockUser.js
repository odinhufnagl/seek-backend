"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const unblockUser_1 = __importDefault(require("../../../controllers/api/functions/unblockUser"));
const middleware_1 = require("../../../middleware");
const wrappers_1 = require("../../../wrappers");
const router = express_1.default.Router();
router.post("/", [middleware_1.verifyTokenMiddleware], (0, wrappers_1.asyncWrapper)(unblockUser_1.default.unblockUserController));
exports.default = router;
