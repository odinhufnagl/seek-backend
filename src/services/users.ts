import { Optional, WhereAttributeHash } from "sequelize";
import { models } from "../db/models";
import { IUser } from "../types";

type CreateUserValues = {
  email: string;
  password: string;
};

const findUsers = async (
  where?: WhereAttributeHash
): Promise<[IUser] | undefined> => {
  try {
    const res = (await models.User.findAll({ where })) as [IUser];
    return res;
  } catch (e) {
    return;
  }
};

const findUser = async (
  where?: WhereAttributeHash
): Promise<IUser | undefined> => {
  try {
    const res = (await models.User.findOne({ where })) as IUser;
    return res;
  } catch (e) {
    return;
  }
};

const findUserByPK = async (id: number): Promise<IUser | undefined> => {
  try {
    const res = (await models.User.findByPk(id)) as IUser;
    return res;
  } catch (e) {
    return;
  }
};

const createUser = async (
  values: CreateUserValues
): Promise<IUser | undefined> => {
  try {
    const res = (await models.User.create(values as any)) as IUser;
    return res;
  } catch (e) {
    return;
  }
};

export { findUsers, createUser, findUser, findUserByPK };
