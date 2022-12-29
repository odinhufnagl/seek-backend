import { Request, Response } from "express";
import { HTTP_ERROR } from "../constants";
import {
  createPredictedUserJobRatings,
  findJobs,
  findPredictedUserJobRatings,
  findUserJobRatings,
} from "../services";
import { RequestWithDBOptions } from "../types";
import { sendErrorMessage, sendServerErrorMessage } from "../utils";

const getPredictedUserJobRatings = async (
  req: RequestWithDBOptions,
  res: Response
): Promise<void> => {
  try {
    const r = await findPredictedUserJobRatings({
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

const postPredictedUserJobRatings = async (req: Request, res: Response) => {
  try {
    const r = await createPredictedUserJobRatings(req.body, {
      updateOnDuplicate: ["value"],
    });
    if (!r) {
      return sendErrorMessage(res, HTTP_ERROR.DATA_NOT_CREATED);
    }
    res.send(r);
  } catch (e) {
    console.log(e);
    sendServerErrorMessage(res, e);
  }
};

export default { getPredictedUserJobRatings, postPredictedUserJobRatings };
