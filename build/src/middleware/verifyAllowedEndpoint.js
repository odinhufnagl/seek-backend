"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCorrectUser = void 0;
const classes_1 = require("../classes");
const verifyCorrectUser = (paramKey, userRole) => (req, res, next) => {
    const tokenId = req.curUserId;
    if (tokenId === undefined) {
        throw new classes_1.ApiNoTokenError();
    }
    if (req.params[paramKey] === undefined) {
        throw new classes_1.ApiDefaultError();
    }
    if (tokenId !== Number(req.params[paramKey])) {
        throw new classes_1.ApiNotAllowedError();
    }
    if (userRole !== req.userRole) {
        throw new classes_1.ApiNotAllowedError();
    }
    next();
};
exports.verifyCorrectUser = verifyCorrectUser;
