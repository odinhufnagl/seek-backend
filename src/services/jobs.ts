import { FindOptions } from "sequelize";
import { models } from "../db/models";
import Job from "../db/models/job";

export const findJobs = async (
  options?: FindOptions
): Promise<Job[] | undefined> => {
  try {
    const res = await models.Job.findAll(options);
    console.log("res", res);
    return res;
  } catch (e) {
    return;
  }
};
