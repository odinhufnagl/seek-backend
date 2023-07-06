import { NextFunction } from "express";
import { Response } from "express";
import { ApiQueryParamsError } from "../classes";
import { DEFAULT_LANGUAGE } from "../constants";
import { RequestWithDBOptions } from "../types";

const addTranslation = async (
  req: RequestWithDBOptions,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log(req.query);
    //here we could do a mapping if we want to use for example sv instead of SE-se in the request
    //req.languageName = (req.query.lang as string) || DEFAULT_LANGUAGE;
    if (req.query.lang) {
      req.languageName = req.query.lang as string;
    }
    delete req.query.lang;
    next();
  } catch (e) {
    next(new ApiQueryParamsError());
  }
};

export { addTranslation };
