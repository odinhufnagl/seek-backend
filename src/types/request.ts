import { Request as ExpressRequest } from "express";
import { FindOptions, Order } from "sequelize";
import {
  QueryParamsAddress,
  QueryParamsCitySearch,
  QueryParamsCountry,
  QueryParamsLocationSearch,
  QueryParamsSearch,
} from ".";
import { UserRole } from "../constants";
import {
  RequestBodyAcceptInvite,
  RequestBodyPostAlbum,
  RequestBodyPostPost,
  RequestBodyPutUser,
} from "./requestBody";

export interface RequestWithUser extends ExpressRequest {
  curUserId?: number;
  userRole?: UserRole;
}

export type QueryProps = {
  where?: Record<any, any>;
  limit?: number;
  skip?: number;
  orderBy?: string;
  sortBy?: string;
};

export interface RequestWithDBOptions extends ExpressRequest {
  dbOptions?: FindOptions;
  order?: Order;
  languageName?: string;
}

export interface RequestCitySearch extends Request {
  query: QueryParamsCitySearch;
}
export interface RequestLocationSearch extends Request {
  query: QueryParamsLocationSearch;
}
export interface RequestSearch extends Request {
  query: QueryParamsSearch;
}
export interface RequestCountry extends Request {
  query: QueryParamsCountry;
}
export interface RequestAddress extends Request {
  query: QueryParamsAddress;
}
export interface RequestPostPost extends Request {
  body: RequestBodyPostPost;
}
export interface RequestPutUser extends Request {
  body: RequestBodyPutUser;
}
export interface RequestAcceptInvite extends Request {
  body: RequestBodyAcceptInvite;
}
export interface RequestPostAlbum extends Request {
  body: RequestBodyPostAlbum;
}

export interface Request extends RequestWithDBOptions, RequestWithUser {}
export type HttpResponseData = {
  body: object;
  status?: number;
};
