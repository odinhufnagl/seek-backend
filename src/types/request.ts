import { Request } from "express";
import { FindOptions } from "sequelize";

export type Decoded = {
  id: number;
};

export interface RequestWithUser extends Request {
  user?: Decoded;
}

export type QueryProps = {
  where?: Record<any, any>;
  limit?: number;
  skip?: number;
  orderBy?: string;
  sortBy?: string;
};

export interface RequestWithDBOptions extends Request {
  dbOptions?: FindOptions;
  orderBy?: string;
  sortBy?: string;
}

export type HttpResponseData = {
  body: object;
  status?: number;
};
