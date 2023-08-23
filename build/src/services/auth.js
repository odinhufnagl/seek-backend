"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUserToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const generateToken = (data) => {
    var token = (0, jsonwebtoken_1.sign)(data, process.env.SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return token;
};
exports.generateToken = generateToken;
const generateUserToken = (id, userRole) => {
    const token = generateToken({ id, userRole });
    return token;
};
exports.generateUserToken = generateUserToken;
