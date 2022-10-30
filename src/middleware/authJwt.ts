import { NextFunction, Request, Response } from "express";
import { Secret, verify } from "jsonwebtoken";
import { HTTP_ERROR } from "../constants";
import { RequestWithUser, IDecode } from "../types";
import { sendErrorMessage, sendServerErrorMessage } from "../utils";
const verifyToken = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers["x-access-token"] as string;
    if (!token) {
      return sendErrorMessage(res, HTTP_ERROR.NO_TOKEN_PROVIDED);
    }
    verify(token, process.env.SECRET as Secret, {}, (err, decoded) => {
      if (err || !decoded) {
        return sendErrorMessage(res, HTTP_ERROR.UNAUTHORIZED);
      }
      req.user = decoded as IDecode;
      next();
    });
  } catch (e) {
    console.log(e);
    sendServerErrorMessage(res, e);
  }
};

export { verifyToken };
