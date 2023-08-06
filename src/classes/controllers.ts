import { NextFunction, Response } from "express";
import {
  BulkCreateOptions,
  CreateOptions,
  DestroyOptions,
  FindOptions,
  ModelStatic,
  UpdateOptions,
} from "sequelize";
import { ResponseConstants } from "../constants";
import {
  dbBulkCreate,
  dbCreate,
  dbDelete,
  dbFindAndCountAll,
  dbFindByPK,
  dbUpdate,
} from "../services/db/db";
import { RequestWithDBOptions } from "../types";
import { RequestBodyIdList } from "../types/index";
import { ApiNoBodyProvidedError } from "./errors";

export class BaseController<M, M2 = {}> {
  model: ModelStatic<any>;
  name: string;
  defaultIdParam = "id";
  constructor(model: ModelStatic<any>, name: string) {
    if (!model) {
      throw new Error("Must define model");
    }
    this.model = model;
    this.name = name;
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.put = this.put.bind(this);
  }
  post =
    (
      singularOptions?: CreateOptions,
      pluralOptions?: BulkCreateOptions,
      afterQueryParamsDBOptions?: boolean
    ) =>
    async (req: RequestWithDBOptions, res: Response, next: NextFunction) => {
      if (!req.body) {
        throw new ApiNoBodyProvidedError();
      }
      let r;
      if (Array.isArray(req.body)) {
        r = await dbBulkCreate(
          this.model,
          req.body,
          afterQueryParamsDBOptions
            ? { ...req.dbOptions, ...pluralOptions }
            : { ...pluralOptions, ...req.dbOptions }
        );
      } else {
        r = await dbCreate(
          this.model,
          req.body,
          afterQueryParamsDBOptions
            ? { ...req.dbOptions, ...singularOptions }
            : { ...singularOptions, ...req.dbOptions }
        );
      }
      res.send(r);
    };
  put =
    (
      options?: UpdateOptions,
      afterQueryParamsDBOptions?: boolean,
      idParam = this.defaultIdParam
    ) =>
    async (req: RequestWithDBOptions, res: Response, next: NextFunction) => {
      const id = Number(req.params[idParam]);
      const r = await dbUpdate(
        this.model,
        req.body,
        { where: { id } }
        /* afterQueryParamsDBOptions
          ? { ...req.dbOptions, ...options }
          : { ...options, ...req.dbOptions }*/
      );
      res.send(r);
    };
  delete =
    (
      options?: (req: RequestWithDBOptions) => DestroyOptions,
      afterQueryParamsDBOptions?: boolean
    ) =>
    async (req: RequestWithDBOptions, res: Response, next: NextFunction) => {
      console.log("dbOpp", req.dbOptions);
      const r = await dbDelete(
        this.model,
        afterQueryParamsDBOptions
          ? { ...req.dbOptions, ...options?.(req) }
          : { ...options?.(req), ...req.dbOptions }
      );
      res.send(r);
    };
  getPlural =
    (
      options?: (req: RequestWithDBOptions) => FindOptions,
      afterQueryParamsDBOptions = false
    ) =>
    async (req: RequestWithDBOptions, res: Response, next: NextFunction) => {
      const r = await dbFindAndCountAll(
        this.model,
        afterQueryParamsDBOptions
          ? { ...req.dbOptions, ...options?.(req) }
          : { ...options?.(req), ...req.dbOptions }
      );
      res.send(r);
    };
  get =
    (
      options?: (req: RequestWithDBOptions) => FindOptions,
      afterQueryParamsDBOptions = false,
      idParam = this.defaultIdParam
    ) =>
    async (req: RequestWithDBOptions, res: Response, next: NextFunction) => {
      const id = Number(req.params[idParam]);
      console.log("dbOptions", req.dbOptions);
      const r = await dbFindByPK(
        this.model,
        id,
        afterQueryParamsDBOptions
          ? { ...req.dbOptions, ...options?.(req) }
          : { ...options?.(req), ...req.dbOptions }
      );
      console.log("r", r);
      res.send(r);
    };

  putNtoM =
    (
      set: (dbObject: M, ids: number[]) => Promise<void>,
      idParam = this.defaultIdParam
    ) =>
    async (req: RequestWithDBOptions, res: Response, next: NextFunction) => {
      const id = Number(req.params[idParam]);
      const body = req.body as RequestBodyIdList;
      const dbObject = await dbFindByPK(this.model, id);
      body.ids && (await set(dbObject, body.ids));
      res.send(ResponseConstants.defaultResponses.success());
    };
  getNtoM =
    (get: (dbObject: M) => Promise<any>, idParam = this.defaultIdParam) =>
    async (req: RequestWithDBOptions, res: Response, next: NextFunction) => {
      const id = Number(req.params[idParam]);
      const dbObject = await dbFindByPK(this.model, id);
      const data = await get(dbObject);
      res.send(data);
    };
  postNtoM =
    (
      add: (dbObject: M, ids: number[]) => Promise<void>,
      idParam = this.defaultIdParam
    ) =>
    async (req: RequestWithDBOptions, res: Response, next: NextFunction) => {
      const id = Number(req.params[idParam]);
      const body = req.body as RequestBodyIdList;
      const dbObject = await dbFindByPK(this.model, id);

      body.ids && (await add(dbObject, body.ids));
      res.send(ResponseConstants.defaultResponses.success());
    };
  deleteNtoM =
    (
      remove: (dbObject: M, ids: number[]) => Promise<void>,
      idParam = this.defaultIdParam
    ) =>
    async (req: RequestWithDBOptions, res: Response, next: NextFunction) => {
      const id = Number(req.params[idParam]);
      const body = req.body as RequestBodyIdList;
      const dbObject = await dbFindByPK(this.model, id);
      body.ids && (await remove(dbObject, body.ids));
      res.send(ResponseConstants.defaultResponses.success());
    };
}
