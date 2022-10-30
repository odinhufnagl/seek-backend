import { Request, Response } from "express";
import { HTTP_ERROR } from "../constants";
import { findUsers } from "../services";
import { sendErrorMessage, sendServerErrorMessage } from "../utils";

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const r = await findUsers();
    if (!r) {
      return sendErrorMessage(res, HTTP_ERROR.DATA_NOT_FOUND);
    }
    res.send(r);
  } catch (e) {
    console.log(e);
    sendServerErrorMessage(res, e);
  }
};

export default { getUsers };
