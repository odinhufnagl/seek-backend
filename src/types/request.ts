import { Request as ExpressRequest } from "express";
import { FindOptions, Order } from "sequelize";
import {
  QueryParamsAddress,
  QueryParamsCitySearch,
  QueryParamsCountry,
  QueryParamsIsUserBlocked,
  QueryParamsLocationSearch,
  QueryParamsSearch,
} from ".";
import { UserRole } from "../constants";
import {
  RequestBodyAcceptInvite,
  RequestBodyBlockUser,
  RequestBodyNewChatSeen,
  RequestBodyPutUser,
  RequestBodyUnblockUser,
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
export interface RequestNewChatSeen extends Request {
  body: RequestBodyNewChatSeen;
}
export interface RequestBlockUser extends Request {
  body: RequestBodyBlockUser;
}
export interface RequestUnblockUser extends Request {
  body: RequestBodyUnblockUser;
}
export interface RequestIsUserBlocked extends Request {
  query: QueryParamsIsUserBlocked;
}

export interface RequestCountry extends Request {
  query: QueryParamsCountry;
}
export interface RequestAddress extends Request {
  query: QueryParamsAddress;
}

export interface RequestPutUser extends Request {
  body: RequestBodyPutUser;
}
export interface RequestAcceptInvite extends Request {
  body: RequestBodyAcceptInvite;
}

export interface Request extends RequestWithDBOptions, RequestWithUser {}
export type HttpResponseData = {
  body: object;
  status?: number;
};
