"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSendError = exports.ExternalError = exports.EmailError = exports.AuthenticateError = exports.DuplicateError = exports.DatabaseCreateError = exports.DatabaseNotFoundError = exports.DatabaseError = exports.ServiceError = exports.ApiQueryParamsError = exports.ApiEmailAlreadyInUseError = exports.ApiWrongPasswordEmailError = exports.ApiDatabaseAlreadyExistError = exports.ApiDatabaseNotFoundError = exports.ApiDatabaseCreateError = exports.ApiDatabaseError = exports.ApiNoKeyError = exports.ApiNoTokenError = exports.ApiAuthenticateError = exports.ApiEmailError = exports.ApiExternalError = exports.ApiNotificationSendError = exports.ApiBadBodyProvidedError = exports.ApiNoBodyProvidedError = exports.ApiDefaultError = exports.ApiNotAllowedError = exports.ApiError = void 0;
const axios_1 = require("axios");
const sequelize_1 = require("sequelize");
/*E100s: Authentication and authorization errors.
E200s: Input validation errors.
E300s: Database or data access errors.
E400s: Business logic errors.
E500s: Server and infrastructure errors.*/
class ApiError extends Error {
    constructor(statusCode, errorCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        Error.captureStackTrace(this, this.constructor);
    }
    static createDefault() {
        return new ApiDefaultError();
    }
    static fromError(e) {
        switch (true) {
            case e instanceof DatabaseNotFoundError:
                return new ApiDatabaseNotFoundError();
            case e instanceof DatabaseError:
                return new ApiDatabaseError();
            case e instanceof EmailError:
                return new ApiEmailError();
            case e instanceof ExternalError:
                return new ApiExternalError();
            case e instanceof axios_1.AxiosError:
                return new ApiExternalError();
            case e instanceof NotificationSendError:
                return new ApiNotificationSendError();
            default:
                return ApiError.createDefault();
        }
    }
}
exports.ApiError = ApiError;
class ApiNotAllowedError extends ApiError {
    constructor() {
        super(403, "E100", "Not allowed to touch this data");
    }
}
exports.ApiNotAllowedError = ApiNotAllowedError;
class ApiDefaultError extends ApiError {
    constructor() {
        super(500, "E500", "Something went wrong");
    }
}
exports.ApiDefaultError = ApiDefaultError;
class ApiNoBodyProvidedError extends ApiError {
    constructor() {
        super(400, "E200", "No body provided");
    }
}
exports.ApiNoBodyProvidedError = ApiNoBodyProvidedError;
class ApiBadBodyProvidedError extends ApiError {
    constructor() {
        super(400, "E200", "Bad body provided");
    }
}
exports.ApiBadBodyProvidedError = ApiBadBodyProvidedError;
class ApiNotificationSendError extends ApiError {
    constructor() {
        super(500, "E500", "There was a problem senging a notification");
    }
}
exports.ApiNotificationSendError = ApiNotificationSendError;
class ApiExternalError extends ApiError {
    constructor() {
        super(502, "E500", "There was an external error");
    }
}
exports.ApiExternalError = ApiExternalError;
class ApiEmailError extends ApiError {
    constructor() {
        super(502, "E500", "Could not send email");
    }
}
exports.ApiEmailError = ApiEmailError;
class ApiAuthenticateError extends ApiError {
    constructor() {
        super(403, "E100", "Not authenticated");
    }
}
exports.ApiAuthenticateError = ApiAuthenticateError;
class ApiNoTokenError extends ApiError {
    constructor() {
        super(403, "E100", "No token provided");
    }
}
exports.ApiNoTokenError = ApiNoTokenError;
class ApiNoKeyError extends ApiError {
    constructor() {
        super(403, "E100", "No key provided");
    }
}
exports.ApiNoKeyError = ApiNoKeyError;
class ApiDatabaseError extends ApiError {
    constructor() {
        super(500, "E300", "There was an error with the database");
    }
}
exports.ApiDatabaseError = ApiDatabaseError;
class ApiDatabaseCreateError extends ApiError {
    constructor() {
        super(500, "E300", "There was an error creating the data in the database");
    }
}
exports.ApiDatabaseCreateError = ApiDatabaseCreateError;
class ApiDatabaseNotFoundError extends ApiError {
    constructor() {
        super(400, "E300", "Could not find the resource in database");
    }
}
exports.ApiDatabaseNotFoundError = ApiDatabaseNotFoundError;
class ApiDatabaseAlreadyExistError extends ApiError {
    constructor() {
        super(400, "E200", "Data already exist in database");
    }
}
exports.ApiDatabaseAlreadyExistError = ApiDatabaseAlreadyExistError;
class ApiWrongPasswordEmailError extends ApiError {
    constructor() {
        super(401, "E101", "Wrong password or email");
    }
}
exports.ApiWrongPasswordEmailError = ApiWrongPasswordEmailError;
class ApiEmailAlreadyInUseError extends ApiError {
    constructor() {
        super(401, "E203", "Email already in use");
    }
}
exports.ApiEmailAlreadyInUseError = ApiEmailAlreadyInUseError;
class ApiQueryParamsError extends ApiError {
    constructor() {
        super(400, "E200", "Something went wrong parsing the query parameters");
    }
}
exports.ApiQueryParamsError = ApiQueryParamsError;
class ServiceError extends Error {
}
exports.ServiceError = ServiceError;
class DatabaseError extends ServiceError {
    static fromSequelizeError(e) {
        switch (true) {
            case e instanceof sequelize_1.EmptyResultError:
                return new DatabaseNotFoundError(e.message);
            default:
                return new DatabaseError(e.message);
        }
    }
}
exports.DatabaseError = DatabaseError;
class DatabaseNotFoundError extends DatabaseError {
}
exports.DatabaseNotFoundError = DatabaseNotFoundError;
class DatabaseCreateError extends DatabaseError {
}
exports.DatabaseCreateError = DatabaseCreateError;
class DuplicateError extends DatabaseError {
}
exports.DuplicateError = DuplicateError;
class AuthenticateError extends ServiceError {
}
exports.AuthenticateError = AuthenticateError;
class EmailError extends ServiceError {
}
exports.EmailError = EmailError;
class ExternalError extends ServiceError {
}
exports.ExternalError = ExternalError;
class NotificationSendError extends ServiceError {
}
exports.NotificationSendError = NotificationSendError;
