import { AxiosError } from "axios";
import { BaseError, EmptyResultError, ValidationError } from "sequelize";
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
    console.log("pp", e);
    switch (true) {
      case e instanceof DatabaseNotFoundError:
        return new ApiDatabaseNotFoundError();
      case e instanceof EmailError:
        return new ApiEmailError();
      case e instanceof ExternalError:
        return new ApiExternalError();
      case e instanceof AxiosError:
        return new ApiExternalError();
      case e instanceof NotificationSendError:
        return new ApiNotificationSendError();
      case e instanceof DatabaseValidationError:
        const firstField = (e as DatabaseValidationError)?.fields[0];
        console.log("firstField", firstField);
        if (firstField.field === "password") {
          return new ApiPasswordValidationError();
        }
        if (firstField.field === "email") {
          return new ApiEmailValidationError();
        }

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
export class ApiPasswordValidationError extends ApiError {
  constructor() {
    super(401, "E204", "Password is not in the right format");
  }
}
export class ApiEmailValidationError extends ApiError {
  constructor() {
    super(401, "E205", "Email is not in the right format");
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
  static fromSequelizeError(e: BaseError) {
    switch (true) {
      case e instanceof EmptyResultError:
        return new DatabaseNotFoundError(e.message);
      case e instanceof ValidationError:
        console.log("ell", e);

        return new DatabaseValidationError(
          e.message,
          (e as ValidationError).errors.map((item) => ({
            field: item.path,
            key: item.validatorKey,
          })) as DatabaseValidationField[]
        );
      default:
        return new DatabaseError(e.message);
    }
  }
}

export class DatabaseNotFoundError extends DatabaseError {}
export class DatabaseCreateError extends DatabaseError {}
type DatabaseValidationField = {
  field: string | null;
  key: "len" | "isEmail" | null;
};
export class DatabaseValidationError extends DatabaseError {
  public fields: DatabaseValidationField[];
  constructor(message: string, fields: DatabaseValidationField[]) {
    super(message);
    this.fields = fields;
  }
}
export class DuplicateError extends DatabaseError {}
export class AuthenticateError extends ServiceError {}
export class EmailError extends ServiceError {}
export class ExternalError extends ServiceError {}
export class NotificationSendError extends ServiceError {}
