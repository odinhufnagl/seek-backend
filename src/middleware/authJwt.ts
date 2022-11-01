import { NextFunction, Request, Response } from "express";

import { HTTP_ERROR } from "../constants";
import { RequestWithUser, Decoded } from "../types";
import {
  sendErrorMessage,
  sendServerErrorMessage,
  decodeToken,
} from "../utils";

const verifyTokenMiddleware = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers["x-access-token"] as string;
    if (!token) {
      return sendErrorMessage(res, HTTP_ERROR.NO_TOKEN_PROVIDED);
    }
    const decoded = decodeToken(token);
    if (!decoded) {
      return sendErrorMessage(res, HTTP_ERROR.UNAUTHORIZED);
    }
    req.user = decoded;
    next();
  } catch (e) {
    console.log(e);
    sendServerErrorMessage(res, e);
  }
};

export { verifyTokenMiddleware };
