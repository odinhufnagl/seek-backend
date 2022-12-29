import { FindOptions } from "sequelize";
import { EmploymentType, models } from "../db/models";

export const findEmploymentTypes = async (
  options?: FindOptions
): Promise<EmploymentType[] | undefined> => {
  try {
    const res = await models.EmploymentType.findAll(options);
    console.log("res", res);
    return res;
  } catch (e) {
    return;
  }
};
