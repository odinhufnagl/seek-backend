import { Request, Response } from "express";
import { HTTP_ERROR } from "../constants";
import Tag from "../db/models/tag";
import { findEmploymentTypes, findJobs, findTags } from "../services";

import { findUserByPK, findUsers, updateUser } from "../services/users";
import { RequestWithDBOptions } from "../types";
import { sendErrorMessage, sendServerErrorMessage } from "../utils";

const getEmploymentTypes = async (
  req: RequestWithDBOptions,
  res: Response
): Promise<void> => {
  try {
    const r = await findEmploymentTypes({
      ...req.dbOptions,
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

export default { getEmploymentTypes };
