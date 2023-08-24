"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const decodeToken = (token) => {
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.SECRET);
        return decoded;
    }
    catch (e) {
        console.log(e);
    }
};
exports.decodeToken = decodeToken;
