import {
  Model,
  FindOptions,
  ModelStatic,
  WhereAttributeHashValue,
  Attributes,
  BulkCreateOptions,
  Options,
  CreateOptions,
  UpdateOptions,
  Sequelize,
} from "sequelize";
import { DatabaseError } from "../../classes";
import { sequelize } from "../../db/models";

export const dbBulkFindOrCreate = async <M extends Model>(
  model: ModelStatic<M>,
  values: M[],
  options?: BulkCreateOptions
): Promise<number[]> => {
  if (!values) {
    return [];
  }
  const existingIds = values
    .filter((v: any) => "id" in v)
    .map((v: any) => v.id);
  const objectsToCreate = values.filter((v: any) => !("id" in v));
  const created = await dbBulkCreate(model, objectsToCreate, {
    ...options,
    returning: true,
  });

  const ids = [...created.map((e: any) => e.id), ...existingIds];
  return ids;
};

export const dbFindOne = async <M extends Model>(
  model: ModelStatic<M>,
  options?: FindOptions
): Promise<M | null> => {
  try {
    const res = await model.findOne(options);
    return res;
  } catch (e) {
    throw DatabaseError.fromSequelizeError(e as Error);
  }
};

export const dbFindAll = async <M extends Model>(
  model: ModelStatic<M>,
  options?: FindOptions
): Promise<M[]> => {
  try {
    console.log(options);
    const res = await model.findAll(options);
    return res;
  } catch (e) {
    throw DatabaseError.fromSequelizeError(e as Error);
  }
};

export const dbFindByPK = async <M extends Model>(
  model: ModelStatic<M>,
  id: number,
  options?: FindOptions
): Promise<M | null> => {
  try {
    const res = await model.findByPk(id, options);
    return res;
  } catch (e) {
    throw DatabaseError.fromSequelizeError(e as Error);
  }
};

export const dbCreate = async <M extends Model>(
  model: ModelStatic<M>,
  values: M,
  options?: CreateOptions
): Promise<M> => {
  try {
    const res = await model.create(values as any, options);
    return res;
  } catch (e) {
    console.log(e);
    throw DatabaseError.fromSequelizeError(e as Error);
  }
};

export const dbUpdate = async <M extends Model>(
  model: ModelStatic<M>,
  id: WhereAttributeHashValue<Attributes<M>[string]> | undefined,
  toUpdate: Model,
  options?: UpdateOptions
): Promise<[affectedCount: number, affectedRows?: M[]]> => {
  try {
    const res = await model.update(toUpdate, {
      ...options,
      where: { id },
    });
    return res;
  } catch (e) {
    throw DatabaseError.fromSequelizeError(e as Error);
  }
};

export const dbBulkCreate = async <M extends Model>(
  model: ModelStatic<M>,
  values: M[],
  options?: BulkCreateOptions
): Promise<M[]> => {
  try {
    console.log("values", values);
    const res = await model.bulkCreate(values as any, options);
    return res;
  } catch (e) {
    console.log(e);
    throw DatabaseError.fromSequelizeError(e as Error);
  }
};
