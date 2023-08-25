import { NextFunction, Response } from "express";
import { ApiError } from "../classes";

import { RequestWithUser } from "../types";

export const errorHandler = (
  err: Error,
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): void => {
  console.log("error handling called");
  console.log(err);

  //the error is a error created from the controller or middleware
  if (err instanceof ApiError) {
    res
      .status(err.statusCode)
      .json({
        error: {
          message: err.message,
          success: false,
          errorCode: err.errorCode,
        },
      });
    return;
  }
  //the error is either some random error or a serviceerror that the controller did not catch
  const apiErr = ApiError.fromError(err);
  res
    .status(apiErr.statusCode)
    .send({
      error: {
        message: apiErr.message,
        success: false,
        errorCode: apiErr.errorCode,
      },
    });
};
