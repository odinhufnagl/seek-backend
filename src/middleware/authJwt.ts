import { NextFunction, Response } from "express";
import { ApiAuthenticateError, ApiNoTokenError } from "../classes";
import { TOKEN_HEADER_KEY } from "../constants";
import { Request, userJWTData } from "../types";
import { decodeToken } from "../utils";

const verifyTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers[TOKEN_HEADER_KEY] as string;
  if (!token) {
    throw new ApiNoTokenError();
  }
  const decoded = decodeToken(token) as userJWTData;
  if (!decoded) {
    throw new ApiAuthenticateError();
  }
  req.curUserId = decoded.id;
  req.userRole = decoded.userRole;
  next();
};

export { verifyTokenMiddleware };
