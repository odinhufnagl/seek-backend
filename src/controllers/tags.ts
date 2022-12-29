import { Request, Response } from "express";
import { HTTP_ERROR } from "../constants";
import { WordVector } from "../db/models";
import Tag from "../db/models/tag";
import { findJobs, findTags } from "../services";

import { findUserByPK, findUsers, updateUser } from "../services/users";
import { RequestWithDBOptions } from "../types";
import { sendErrorMessage, sendServerErrorMessage } from "../utils";

const include = [{ model: WordVector, as: "name" }];

const getTags = async (
  req: RequestWithDBOptions,
  res: Response
): Promise<void> => {
  try {
    const r = await findTags({
      ...req.dbOptions,
      include,
    });
    console.log(r);
    if (!r) {
      return sendErrorMessage(res, HTTP_ERROR.DATA_NOT_FOUND);
    }
    res.send(r);
  } catch (e) {
    console.log(e);
    sendServerErrorMessage(res, e);
  }
};

export default { getTags };
