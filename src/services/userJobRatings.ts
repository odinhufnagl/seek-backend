import { FindOptions } from "sequelize";
import { EmploymentType, models } from "../db/models";
import UserJobRating from "../db/models/userJobRating";

export const findUserJobRatings = async (
  options?: FindOptions
): Promise<UserJobRating[] | undefined> => {
  try {
    const res = await models.UserJobRating.findAll(options);
    console.log("res", res);
    return res;
  } catch (e) {
    return;
  }
};
