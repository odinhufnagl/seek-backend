import { BulkCreateOptions, FindOptions } from "sequelize";
import { EmploymentType, models, PredictedUserJobRating } from "../db/models";
import UserJobRating from "../db/models/userJobRating";

export const findPredictedUserJobRatings = async (
  options?: FindOptions
): Promise<UserJobRating[] | undefined> => {
  try {
    const res = await models.PredictedUserJobRating.findAll(options);
    console.log("res", res);
    return res;
  } catch (e) {
    return;
  }
};

export const createPredictedUserJobRatings = async (
  values: PredictedUserJobRating[],
  options?: BulkCreateOptions
): Promise<PredictedUserJobRating[] | undefined> => {
  try {
    const res = await models.PredictedUserJobRating.bulkCreate(
      values as any,
      options
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};
