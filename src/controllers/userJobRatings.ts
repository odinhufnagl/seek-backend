import { Response } from "express";
import { HTTP_ERROR } from "../constants";
import { Job, User } from "../db/models";
import { findJobs, findUserJobRatings, sentenceToVec } from "../services";
import { RequestWithDBOptions } from "../types";
import { sendErrorMessage, sendServerErrorMessage } from "../utils";
import { include as userInclude } from "./users";
import { include as jobInclude } from "./jobs";

const include = [
  {
    model: User,
    include: userInclude,
  },
  { model: Job, include: jobInclude },
];

const getUserJobRatings = async (
  req: RequestWithDBOptions,
  res: Response
): Promise<void> => {
  try {
    const r = await findUserJobRatings({
      ...req.dbOptions,
      include,
    });
    console.log("ratings", r);
    if (!r) {
      return sendErrorMessage(res, HTTP_ERROR.DATA_NOT_FOUND);
    }
    res.send(r);
  } catch (e) {
    console.log(e);
    sendServerErrorMessage(res, e);
  }
};

export default { getUserJobRatings };
