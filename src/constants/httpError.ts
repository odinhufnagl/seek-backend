import { HttpResponseData } from "../types";

const HTTP_ERROR: Record<string, HttpResponseData> = {
  DATA_NOT_FOUND: { body: { message: "Data not found" }, status: 404 },
  DATA_NOT_CREATED: { body: { message: "Could not create data" } },
  DATA_NOT_UPDATED: { body: { message: "Could not update data" } },
  DATA_ALREADY_EXIST: { body: { message: "Data already exist" }, status: 400 },
  INVALID_PASSWORD: {
    body: { message: "Invalid password", accessToken: null },
  },
  NO_AUTHENTICATED_USER: { body: { message: "No authenticated user" } },
  NO_TOKEN_PROVIDED: { body: { message: "No token provided" }, status: 403 },
  UNAUTHORIZED: { body: { message: "Unauthorized" }, status: 401 },
  QUERY_STRING: { body: { message: "Error in queryString" }, status: 404 },
};

export { HTTP_ERROR };
