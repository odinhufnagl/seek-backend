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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
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
    const url = yield (0, services_1.uploadFile)(file.buffer, folderPath, file.mimetype);
    res.send({ url });
});
const profileImageFileUploadController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    console.log("file", file);
    if (!file) {
        throw new classes_1.ApiNoBodyProvidedError();
    }
    const fileBuffer = file.buffer;
    const compressedBuffer = yield (0, sharp_1.default)(fileBuffer)
        .resize({
        fit: sharp_1.default.fit.contain,
        width: constants_1.ExternalStorageConstants.defaultSize.PROFILE_IMAGE.width,
    })
        .jpeg({ quality: constants_1.ExternalStorageConstants.defaultQuality.PROFILE_IMAGE })
        .withMetadata()
        .toBuffer();
    const folderPath = constants_1.ExternalStorageConstants.defaultUploadFolderPath.PROFILE_IMAGES;
    const url = yield (0, services_1.uploadFile)(compressedBuffer, folderPath, file.mimetype);
    res.send({ url });
});
exports.default = { profileImageFileUploadController, singleFileUploadController };
