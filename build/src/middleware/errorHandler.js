"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const classes_1 = require("../classes");
const errorHandler = (err, req, res, next) => {
    console.log("error handling called");
    console.log(err);
    //the error is a error created from the controller or middleware
    if (err instanceof classes_1.ApiError) {
        res
            .status(err.statusCode)
            .json({ error: { message: err.message, success: false } });
        return;
    }
    //the error is either some random error or a serviceerror that the controller did not catch
    const apiErr = classes_1.ApiError.fromError(err);
    res
        .status(apiErr.statusCode)
        .send({ error: { message: apiErr.message, success: false } });
};
exports.errorHandler = errorHandler;
