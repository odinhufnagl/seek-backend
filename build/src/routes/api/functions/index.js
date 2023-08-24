"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileUpload_1 = __importDefault(require("./fileUpload"));
const maps_1 = __importDefault(require("./maps"));
const newChatSeen_1 = __importDefault(require("./newChatSeen"));
const search_1 = __importDefault(require("./search"));
const functionsRouter = (0, express_1.Router)({ mergeParams: true });
functionsRouter.use("/fileUpload", fileUpload_1.default);
functionsRouter.use("/maps", maps_1.default);
functionsRouter.use("/search", search_1.default);
functionsRouter.use("/newChatSeen", newChatSeen_1.default);
exports.default = functionsRouter;