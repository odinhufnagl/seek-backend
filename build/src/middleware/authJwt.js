"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenMiddleware = void 0;
const classes_1 = require("../classes");
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const verifyTokenMiddleware = (req, res, next) => {
    const token = req.headers[constants_1.TOKEN_HEADER_KEY];
    if (!token) {
        throw new classes_1.ApiNoTokenError();
    }
    const decoded = (0, utils_1.decodeToken)(token);
    if (!decoded) {
        throw new classes_1.ApiAuthenticateError();
    }
    req.curUserId = decoded.id;
    req.userRole = decoded.userRole;
    next();
};
exports.verifyTokenMiddleware = verifyTokenMiddleware;
