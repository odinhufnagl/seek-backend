"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = __importDefault(require("./users/index"));
const authRouter = (0, express_1.Router)({ mergeParams: true });
authRouter.use("/users", index_1.default);
exports.default = authRouter;
