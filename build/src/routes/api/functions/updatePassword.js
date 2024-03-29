"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const updatePassword_1 = __importDefault(require("../../../controllers/api/functions/updatePassword"));
const wrappers_1 = require("../../../wrappers");
const router = express_1.default.Router();
router.post("/", (0, wrappers_1.asyncWrapper)(updatePassword_1.default.updatePasswordController));
exports.default = router;
