import { compareSync, hashSync } from "bcryptjs";
import { Response } from "express";
import { createUser, findUser, findUserByPK } from "../../../services/db/users";
import { Request } from "../../../types";

import {
  ApiAuthenticateError,
  ApiWrongPasswordEmailError,
  DatabaseNotFoundError,
} from "../../../classes";
import { DBConstants, UserRole } from "../../../constants";
import { Coordinate, File, Location } from "../../../db/models";
import { generateUserToken } from "../../../services/auth";

const signUp = async (req: Request, res: Response): Promise<void> => {
  const { password, ...userData } = req.body;
  const user = await createUser(
    {
      password: hashSync(password),
      ...userData,
    },
    {
      include: [
        { model: File, as: DBConstants.fields.user.PROFILE_IMAGE },
        { model: Location, include: [{ model: Coordinate }] },
      ],
    }
  );
  const token = generateUserToken(user.id, UserRole.USER);
  res.send({ accessToken: token, user });
};

const signIn = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await findUser({
      where: { email },
      attributes: { include: ["password"] },
      include: [{ model: File, as: DBConstants.fields.user.PROFILE_IMAGE }],
    });

    if (!user.password) {
      throw new ApiWrongPasswordEmailError();
    }
    var passwordIsValid = compareSync(password, user?.password);
    if (!passwordIsValid) {
      throw new ApiWrongPasswordEmailError();
    }
    const token = generateUserToken(user.id, UserRole.USER);
    res.send({
      user,
      accessToken: token,
    });
  } catch (e) {
    if (e instanceof DatabaseNotFoundError) {
      throw new ApiWrongPasswordEmailError();
    }
  }
};

const authenticate = async (req: Request, res: Response): Promise<void> => {
  if (!req.curUserId || req.userRole !== UserRole.USER) {
    throw new ApiAuthenticateError();
  }
  //user comes from middleware (token object)
  const user = await findUserByPK(req.curUserId, {
    include: [{ model: File, as: DBConstants.fields.user.PROFILE_IMAGE }],
  });
  const token = generateUserToken(user.id, UserRole.USER);
  res.send({ user, accessToken: token });
};

export default { signUp, signIn, authenticate };
