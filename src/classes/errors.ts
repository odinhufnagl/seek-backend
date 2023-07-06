import { AxiosError } from "axios";
import { EmptyResultError } from "sequelize";

export class ApiError extends Error {
  public statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
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
    super(403, "Not allowed to touch this data");
  }
}

export class ApiDefaultError extends ApiError {
  constructor() {
    super(500, "Something went wrong");
  }
}

export class ApiNoBodyProvidedError extends ApiError {
  constructor() {
    super(400, "No body provided");
  }
}

export class ApiBadBodyProvidedError extends ApiError {
  constructor() {
    super(400, "Bad body provided");
  }
}

export class ApiNotificationSendError extends ApiError {
  constructor() {
    super(500, "There was a problem senging a notification");
  }
}

export class ApiExternalError extends ApiError {
  constructor() {
    super(502, "There was an external error");
  }
}

export class ApiEmailError extends ApiError {
  constructor() {
    super(502, "Could not send email");
  }
}

export class ApiAuthenticateError extends ApiError {
  constructor() {
    super(403, "Not authenticated");
  }
}

export class ApiNoTokenError extends ApiError {
  constructor() {
    super(403, "No token provided");
  }
}

export class ApiNoKeyError extends ApiError {
  constructor() {
    super(403, "No key provided");
  }
}

export class ApiDatabaseError extends ApiError {
  constructor() {
    super(500, "There was an error with the database");
  }
}

export class ApiDatabaseCreateError extends ApiError {
  constructor() {
    super(500, "There was an error creating the data in the database");
  }
}

export class ApiDatabaseNotFoundError extends ApiError {
  constructor() {
    super(400, "Could not find the resource in database");
  }
}

export class ApiDatabaseAlreadyExistError extends ApiError {
  constructor() {
    super(400, "Data already exist in database");
  }
}

export class ApiWrongPasswordError extends ApiError {
  constructor() {
    super(401, "Wrong password");
  }
}

export class ApiQueryParamsError extends ApiError {
  constructor() {
    super(400, "Something went wrong parsing the query parameters");
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
