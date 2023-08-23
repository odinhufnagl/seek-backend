"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../../classes");
const constants_1 = require("../../../constants");
const services_1 = require("../../../services");
const singleFileUploadController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    console.log("file", file);
    if (!file) {
        throw new classes_1.ApiNoBodyProvidedError();
    }
    const folderPath = constants_1.ExternalStorageConstants.defaultUploadFolderPath.SERVER_UPLOADS;
    const url = yield (0, services_1.uploadFile)(file, folderPath, file.mimetype);
    res.send({ url });
});
exports.default = { singleFileUploadController };
