"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorMessage = exports.sendServerErrorMessage = void 0;
const sendServerErrorMessage = (res, e) => {
    res.status(500).send({ message: e });
};
exports.sendServerErrorMessage = sendServerErrorMessage;
const sendErrorMessage = (res, data) => {
    res.status(data.status || 404).send(data.body);
};
exports.sendErrorMessage = sendErrorMessage;
