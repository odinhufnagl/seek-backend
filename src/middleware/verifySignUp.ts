import { NextFunction, Request, Response } from "express";
import { ApiDatabaseAlreadyExistError } from "../classes";
import { existsUser } from "../services/db/users";
const checkUserDuplicateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userExists = await existsUser({
    where: {
      email: req.body.email,
    },
  });
  if (userExists) {
    throw new ApiDatabaseAlreadyExistError();
  }
  next();
};

export { checkUserDuplicateEmail };
