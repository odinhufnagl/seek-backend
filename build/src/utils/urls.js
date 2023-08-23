"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryParams = void 0;
const url_1 = __importDefault(require("url"));
const querystring_1 = __importDefault(require("querystring"));
const getQueryParams = (url) => querystring_1.default.parse(url_1.default.parse(url || "").query || "");
exports.getQueryParams = getQueryParams;
