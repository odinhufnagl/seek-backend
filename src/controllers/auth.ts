import { Request, Response } from "express";
import { generateToken } from "../services";
import { compareSync, hashSync } from "bcryptjs";
import { createUser, findUser, findUserByPK } from "../services/users";
import { RequestWithUser } from "../types";
import { sendErrorMessage, sendServerErrorMessage } from "../utils";
import { HTTP_ERROR } from "../constants";

const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { password, ...userData } = req.body;
    const user = await createUser({
      password: hashSync(password),
      ...userData,
    });
    if (!user) {
      return sendErrorMessage(res, HTTP_ERROR.DATA_NOT_CREATED);
    }
    const token = generateToken({ id: user.id });
    res.send({ accessToken: token, user });
  } catch (e) {
    console.log(e);
    sendServerErrorMessage(res, e);
  }
};

const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await findUser({ where: { email } });
    if (!user || !user.password) {
      return sendErrorMessage(res, HTTP_ERROR.DATA_NOT_FOUND);
    }
    var passwordIsValid = compareSync(password, user?.password);

    if (!passwordIsValid) {
      return sendErrorMessage(res, HTTP_ERROR.INVALID_PASSWORD);
    }

    const token = generateToken({ id: user.id });

    res.send({
      user,
      accessToken: token,
    });
  } catch (e) {
    console.log(e);
    sendServerErrorMessage(res, e);
  }
};

const authenticate = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      return sendErrorMessage(res, HTTP_ERROR.NO_AUTHENTICATED_USER);
    }
    //user comes from middleware (token object)
    const user = await findUserByPK(req.user.id);
    if (!user) {
      return sendErrorMessage(res, HTTP_ERROR.DATA_NOT_FOUND);
    }
    const token = generateToken({ id: user.id });
    res.send({ user, accessToken: token });
  } catch (e) {
    console.log(e);
    sendServerErrorMessage(res, e);
  }
};

export default { signUp, signIn, authenticate };
