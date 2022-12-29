import { Request, Response } from "express";
import { HTTP_ERROR } from "../constants";
import { EmploymentType, WordVector } from "../db/models";
import Tag from "../db/models/tag";
import { findJobs } from "../services";

import { findUserByPK, findUsers, updateUser } from "../services/users";
import { RequestWithDBOptions } from "../types";
import { sendErrorMessage, sendServerErrorMessage } from "../utils";

export const include = [
  {
    model: Tag,
    as: "tags",
    include: [{ model: WordVector, as: "name" }],
  },
  { model: EmploymentType, as: "employmentTypes" },
  { model: WordVector, as: "title" },
];

const getJobs = async (
  req: RequestWithDBOptions,
  res: Response
): Promise<void> => {
  try {
    const r = await findJobs({
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

export default { getJobs };
