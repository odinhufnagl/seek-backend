import { NextFunction, Request, Response } from "express";
import {
  ApiAuthenticateError,
  ApiDefaultError,
  ApiError,
  ApiNotAllowedError,
  ApiNoTokenError,
} from "../classes";
import { TOKEN_HEADER_KEY, UserRole } from "../constants";
import { RequestWithUser } from "../types";
import { decodeToken } from "../utils";

const verifyCorrectUser =
  (paramKey: string, userRole: UserRole) =>
  (req: RequestWithUser, res: Response, next: NextFunction): void => {
    const tokenId = req.curUserId;
    if (tokenId === undefined) {
      throw new ApiNoTokenError();
    }
    if (req.params[paramKey] === undefined) {
      throw new ApiDefaultError();
    }
    if (tokenId !== Number(req.params[paramKey])) {
      throw new ApiNotAllowedError();
    }
    if (userRole !== req.userRole) {
      throw new ApiNotAllowedError();
    }
    next();
  };

export { verifyCorrectUser };
