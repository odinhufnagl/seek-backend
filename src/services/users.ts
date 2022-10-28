import { WhereAttributeHash } from "sequelize";
import { models } from "../db/models";

const getUsers = async (where?: WhereAttributeHash) => {
  try {
    const res = await models.User.findAll({ where });
    return res;
  } catch (e) {
    return;
  }
};

export { getUsers };
