import { NextFunction } from "express";
import { Response } from "express";
import { RequestWithDBOptions } from "../types";
import { sendServerErrorMessage } from "../utils";

const parseQueryParamsToDBOptions = async (
  req: RequestWithDBOptions,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { limit, offset, orderBy, sortBy, ...where } = req.query;

    req.dbOptions = {
      offset: offset ? Number(offset) : undefined,
      limit: limit ? Number(limit) : undefined,
      order:
        sortBy && orderBy ? [[String(sortBy), String(orderBy)]] : undefined,
      where,
    };
    req.orderBy = String(orderBy);
    req.sortBy = String(sortBy);
    next();
  } catch (e) {
    console.log(e);
    sendServerErrorMessage(res, e);
  }
};

export { parseQueryParamsToDBOptions };
