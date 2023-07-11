import { FindOptions, UpdateOptions } from "sequelize";
import { DatabaseCreateError, DatabaseNotFoundError } from "../../classes";
import { User, models } from "../../db/models";

import { dbCreate, dbFindAll, dbFindByPK, dbFindOne, dbUpdate } from "./db";

export const findUsers = async (
  options?: FindOptions
): Promise<User[] | undefined> => {
  const res = await dbFindAll(models.User, options);
  if (!res) {
    throw new DatabaseNotFoundError();
  }
  return res.filter((usr) => delete usr["password"] && usr);
};

export const findUser = async (options: FindOptions): Promise<User> => {
  const res = await dbFindOne(models.User, options);
  if (!res) {
    throw new DatabaseNotFoundError();
  }
  return res;
};

export const existsUser = async (options: FindOptions): Promise<boolean> => {
  return Boolean(await dbFindOne(models.User, options));
};

export const findUserByPK = async (
  id: number,
  options?: FindOptions
): Promise<User> => {
  const res = (await dbFindByPK(models.User, id, options)) as User;
  if (!res) {
    throw new DatabaseNotFoundError();
  }
  return res;
};

export const createUser = async (values: User): Promise<User> => {
  const res = (await dbCreate(models.User, values as any)) as User;
  if (!res) {
    throw new DatabaseCreateError();
  }
  return res;
};

export const updateUser = async (
  userId: number,
  toUpdate: User,
  options?: UpdateOptions
): Promise<[affectedCount: number, affectedRows?: User[]] | undefined> => {
  const res = await dbUpdate(models.User, toUpdate, {
    ...options,
    where: { id: userId },
  });
  return res;
};
