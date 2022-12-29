import { FindOptions } from "sequelize";
import { models } from "../db/models";
import Tag from "../db/models/tag";

export const findTags = async (
  options?: FindOptions
): Promise<Tag[] | undefined> => {
  try {
    const res = await models.Tag.findAll(options);
    console.log("res", res);
    return res;
  } catch (e) {
    return;
  }
};
