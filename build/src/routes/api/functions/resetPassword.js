"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resetPassword_1 = __importDefault(require("../../../controllers/api/functions/resetPassword"));
const wrappers_1 = require("../../../wrappers");
const router = express_1.default.Router();
router.post("/", (0, wrappers_1.asyncWrapper)(resetPassword_1.default.resetPasswordController));
exports.default = router;
