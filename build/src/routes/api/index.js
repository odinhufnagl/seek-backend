"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../../middleware");
const auth_1 = __importDefault(require("./auth"));
const db_1 = __importDefault(require("./db"));
const functions_1 = __importDefault(require("./functions"));
const mainRouter = (0, express_1.Router)();
mainRouter.use("/auth", auth_1.default);
mainRouter.use("/f", functions_1.default);
mainRouter.use("/", [middleware_1.verifyTokenMiddleware], db_1.default);
exports.default = mainRouter;
