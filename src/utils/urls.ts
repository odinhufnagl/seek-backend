import urlFunc from "url";
import querystring from "querystring";

const getQueryParams = (url: string | undefined): Record<any, any> =>
  querystring.parse(urlFunc.parse(url || "").query || "");

export { getQueryParams };
