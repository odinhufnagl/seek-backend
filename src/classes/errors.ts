import { AxiosError } from "axios";
import { EmptyResultError } from "sequelize";
import { ApiErrorType } from "../types";

/*E100s: Authentication and authorization errors.
E200s: Input validation errors.
E300s: Database or data access errors.
E400s: Business logic errors.
E500s: Server and infrastructure errors.*/

export class ApiError extends Error {
  public statusCode: number;
  public errorCode: ApiErrorType;
  constructor(statusCode: number, errorCode: ApiErrorType, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
  static createDefault() {
    return new ApiDefaultError();
  }

  static fromError(e: Error) {
    switch (true) {
      case e instanceof DatabaseNotFoundError:
        return new ApiDatabaseNotFoundError();
      case e instanceof DatabaseError:
        return new ApiDatabaseError();
      case e instanceof EmailError:
        return new ApiEmailError();
      case e instanceof ExternalError:
        return new ApiExternalError();
      case e instanceof AxiosError:
        return new ApiExternalError();
      case e instanceof NotificationSendError:
        return new ApiNotificationSendError();
      default:
        return ApiError.createDefault();
    }
  }
}

export class ApiNotAllowedError extends ApiError {
  constructor() {
    super(403, "E100", "Not allowed to touch this data");
  }
}

export class ApiDefaultError extends ApiError {
  constructor() {
    super(500, "E500", "Something went wrong");
  }
}

export class ApiNoBodyProvidedError extends ApiError {
  constructor() {
    super(400, "E200", "No body provided");
  }
}

export class ApiBadBodyProvidedError extends ApiError {
  constructor() {
    super(400, "E200", "Bad body provided");
  }
}

export class ApiNotificationSendError extends ApiError {
  constructor() {
    super(500, "E500", "There was a problem senging a notification");
  }
}

export class ApiExternalError extends ApiError {
  constructor() {
    super(502, "E500", "There was an external error");
  }
}

export class ApiEmailError extends ApiError {
  constructor() {
    super(502, "E500", "Could not send email");
  }
}

export class ApiAuthenticateError extends ApiError {
  constructor() {
    super(403, "E100", "Not authenticated");
  }
}

export class ApiNoTokenError extends ApiError {
  constructor() {
    super(403, "E100", "No token provided");
  }
}

export class ApiNoKeyError extends ApiError {
  constructor() {
    super(403, "E100", "No key provided");
  }
}

export class ApiDatabaseError extends ApiError {
  constructor() {
    super(500, "E300", "There was an error with the database");
  }
}

export class ApiDatabaseCreateError extends ApiError {
  constructor() {
    super(500, "E300", "There was an error creating the data in the database");
  }
}

export class ApiDatabaseNotFoundError extends ApiError {
  constructor() {
    super(400, "E300", "Could not find the resource in database");
  }
}

export class ApiDatabaseAlreadyExistError extends ApiError {
  constructor() {
    super(400, "E200", "Data already exist in database");
  }
}

export class ApiWrongPasswordEmailError extends ApiError {
  constructor() {
    super(401, "E101", "Wrong password or email");
  }
}
export class ApiEmailAlreadyInUseError extends ApiError {
  constructor() {
    super(401, "E203", "Email already in use");
  }
}

export class ApiQueryParamsError extends ApiError {
  constructor() {
    super(400, "E200", "Something went wrong parsing the query parameters");
  }
}

export class ServiceError extends Error {}

export class DatabaseError extends ServiceError {
  static fromSequelizeError(e: Error) {
    switch (true) {
      case e instanceof EmptyResultError:
        return new DatabaseNotFoundError(e.message);
      default:
        return new DatabaseError(e.message);
    }
  }
}

export class DatabaseNotFoundError extends DatabaseError {}
export class DatabaseCreateError extends DatabaseError {}
export class DuplicateError extends DatabaseError {}
export class AuthenticateError extends ServiceError {}
export class EmailError extends ServiceError {}
export class ExternalError extends ServiceError {}
export class NotificationSendError extends ServiceError {}
