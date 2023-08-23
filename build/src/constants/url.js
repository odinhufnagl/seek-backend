"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseConstants = exports.API_HEADER_KEY = exports.FILE_UPLOAD_BODY_KEY = exports.TOKEN_HEADER_KEY = void 0;
exports.TOKEN_HEADER_KEY = "x-access-token";
exports.FILE_UPLOAD_BODY_KEY = "file";
exports.API_HEADER_KEY = "x-access-key";
class ResponseConstants {
}
exports.ResponseConstants = ResponseConstants;
ResponseConstants.defaultResponses = {
    success: () => ({ success: true }),
};
