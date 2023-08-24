"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authUser_1 = __importDefault(require("../../../../controllers/api/auth/authUser"));
const middleware_1 = require("../../../../middleware");
const wrappers_1 = require("../../../../wrappers");
const router = express_1.default.Router();
router.get("/", [middleware_1.verifyTokenMiddleware], (0, wrappers_1.asyncWrapper)(authUser_1.default.authenticate));
router.post("/signin", (0, wrappers_1.asyncWrapper)(authUser_1.default.signIn));
router.post("/signup", [(0, wrappers_1.asyncWrapper)(middleware_1.checkUserDuplicateEmail)], (0, wrappers_1.asyncWrapper)(authUser_1.default.signUp));
exports.default = router;
