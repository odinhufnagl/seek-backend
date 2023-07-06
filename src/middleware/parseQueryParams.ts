import { NextFunction } from "express";
import { Response } from "express";
import { WhereOptions } from "sequelize";
import { ApiQueryParamsError } from "../classes";
import { RequestWithDBOptions } from "../types";
import { sequelize } from "../db/models/index";
import { Order } from "sequelize";
const queryParser = require("sequelize-query")(sequelize);
//DBOptions should be available in the req, so we dont have to parse them in each controller

type ParsedQueryParams = {
  where: WhereOptions;
  offset: number;
  limit: number;
  attributes: string[];
  order: Order;
};

const parseQueryParamsToDBOptions = async (
  req: RequestWithDBOptions,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const query = (await queryParser.parse(req)) as ParsedQueryParams;
    req.dbOptions = query;
    req.order = query.order;
    next();
  } catch (e) {
    next(new ApiQueryParamsError());
  }
};

export { parseQueryParamsToDBOptions };
