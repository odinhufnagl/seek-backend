import { Request, Response } from "express";
import { HTTP_ERROR } from "../constants";
import { findUsers } from "../services";
import { findUserByPK, updateUser } from "../services/users";
import { RequestWithDBOptions } from "../types";
import { sendErrorMessage, sendServerErrorMessage } from "../utils";

const getUsers = async (
  req: RequestWithDBOptions,
  res: Response
): Promise<void> => {
  try {
    const r = await findUsers(req.dbOptions);
    if (!r) {
      return sendErrorMessage(res, HTTP_ERROR.DATA_NOT_FOUND);
    }
    res.send(r);
  } catch (e) {
    console.log(e);
    sendServerErrorMessage(res, e);
  }
};

const getUserByPK = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = Number(req.params.id);

    const r = await findUserByPK(userId);
    if (!r) {
      return sendErrorMessage(res, HTTP_ERROR.DATA_NOT_FOUND);
    }
    res.send(r);
  } catch (e) {
    console.log(e);
    sendServerErrorMessage(res, e);
  }
};

const putUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = Number(req.params.id);
    const toUpdate = req.body;
    const r = await updateUser(userId, toUpdate);
    if (!r) {
      return sendErrorMessage(res, HTTP_ERROR.DATA_NOT_UPDATED);
    }
    res.send(r);
  } catch (e) {
    console.log(e);
    sendServerErrorMessage(res, e);
  }
};

export default { getUsers, getUserByPK, putUser };
