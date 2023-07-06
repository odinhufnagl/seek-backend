import { NextFunction, Request, Response } from "express";
import { ApiAuthenticateError, ApiNoKeyError } from "../classes";
import { API_HEADER_KEY } from "../constants";
import { RequestWithUser } from "../types";
import { decodeToken } from "../utils";

/*const verifyAPIKeyMiddleware = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): void => {
  const key = req.headers[API_HEADER_KEY] as string;
  if (!key) {
    throw new ApiNoKeyError();
  }
  const approved = decodeToken(key);
  if (!approved) {
    throw new ApiAuthenticateError();
  }
  next();
};*/

const verifyMLAPIKeyMiddleware = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): void => {
  const key = req.headers[API_HEADER_KEY] as string;
  if (!key) {
    throw new ApiNoKeyError();
  }
  const approved = key == process.env.ML_LOCAL_API_KEY;
  if (!approved) {
    throw new ApiAuthenticateError();
  }
  next();
};

export { verifyMLAPIKeyMiddleware };
