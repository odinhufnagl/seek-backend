import { NextFunction } from "express";
import { models } from "../db/models";
import { Request, Response } from "express";
import { sendErrorMessage, sendServerErrorMessage } from "../utils";
import { HTTP_ERROR } from "../constants";

const checkDuplicateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await models.User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      return sendErrorMessage(res, HTTP_ERROR.DATA_ALREADY_EXIST);
    }
    next();
  } catch (e) {
    console.log(e);
    sendServerErrorMessage(res, e);
  }
};

export { checkDuplicateEmail };
