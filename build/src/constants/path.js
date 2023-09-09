"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathConstants = void 0;
const path_1 = __importDefault(require("path"));
const { dirname } = require("path");
const appDir = dirname((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename);
const defaultFolderPath = {
    TEMP_FILE_FOLDER: path_1.default.join(appDir, "assets/temp"),
    EMAIL_TEMPLATES_FOLDER: path_1.default.join(appDir, "assets/emailTemplates"),
};
class PathConstants {
}
exports.PathConstants = PathConstants;
PathConstants.defaultFolderPath = defaultFolderPath;
