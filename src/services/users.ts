import { FindOptions } from "sequelize";
import { models } from "../db/models";
import { IUser } from "../types";

export const findUsers = async (
  options?: FindOptions
): Promise<[IUser] | undefined> => {
  try {
    const res = (await models.User.findAll(options)) as [IUser];
    return res;
  } catch (e) {
    return;
  }
};

export const findUser = async (
  options: FindOptions
): Promise<IUser | undefined> => {
  try {
    const res = (await models.User.findOne(options)) as IUser;
    return res;
  } catch (e) {
    return;
  }
};

export const findUserByPK = async (id: number): Promise<IUser | undefined> => {
  try {
    const res = (await models.User.findByPk(id)) as IUser;
    return res;
  } catch (e) {
    return;
  }
};

export const createUser = async (values: IUser): Promise<IUser | undefined> => {
  try {
    const res = (await models.User.create(values as any)) as IUser;
    return res;
  } catch (e) {
    return;
  }
};

export const updateUser = async (
  userId: number,
  toUpdate: IUser
): Promise<[affectedCount: number] | undefined> => {
  try {
    const res = await models.User.update(toUpdate, { where: { id: userId } });
    return res;
  } catch (e) {
    console.log(e);
  }
};
