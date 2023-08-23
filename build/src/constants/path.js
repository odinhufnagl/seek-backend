"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathConstants = void 0;
const path_1 = __importDefault(require("path"));
const { dirname } = require("path");
//const appDir = dirname(require.main?.filename);
const defaultFolderPath = {
    TEMP_FILE_FOLDER: path_1.default.join(__dirname, "assets/temp"),
};
class PathConstants {
}
exports.PathConstants = PathConstants;
PathConstants.defaultFolderPath = defaultFolderPath;
