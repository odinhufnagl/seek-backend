"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMLAPIKeyMiddleware = void 0;
const classes_1 = require("../classes");
const constants_1 = require("../constants");
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
const verifyMLAPIKeyMiddleware = (req, res, next) => {
    const key = req.headers[constants_1.API_HEADER_KEY];
    if (!key) {
        throw new classes_1.ApiNoKeyError();
    }
    const approved = key == process.env.ML_LOCAL_API_KEY;
    if (!approved) {
        throw new classes_1.ApiAuthenticateError();
    }
    next();
};
exports.verifyMLAPIKeyMiddleware = verifyMLAPIKeyMiddleware;
