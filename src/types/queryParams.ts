import { LocationSearchType } from "./maps";

export interface QueryParams extends Record<string, any> {}

export interface QueryParamsCitySearch extends QueryParams {
  search_query?: string;
  type?: LocationSearchType;
}
export interface QueryParamsSearch extends QueryParams {
  search_query?: string;
  userId: string;
  limit: string;
  offset: string;
}
export interface QueryParamsLocationSearch extends QueryParams {
  search_query?: string;
  type?: LocationSearchType;
}
export interface QueryParamsCountry extends QueryParams {
  lat?: string;
  lng?: string;
  place_id?: string;
}
export interface QueryParamsAddress extends QueryParams {
  lat?: string;
  lng?: string;
  place_id?: string;
}
