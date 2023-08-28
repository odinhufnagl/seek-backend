"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.uploadFile = void 0;
const admin = __importStar(require("firebase-admin"));
const path = __importStar(require("path"));
const uuid_1 = require("uuid");
const constants_1 = require("../constants");
const uploadFile = (file, folderPath, contentType) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, uuid_1.v4)();
    const fileName = `${(0, uuid_1.v4)()}`;
    const destination = path.join(folderPath, fileName);
    /* const tempFilePath = path.join(
      PathConstants.defaultFolderPath.TEMP_FILE_FOLDER,
      fileName
    );*/
    // const res = await fs.promises.writeFile(tempFilePath, file.buffer);
    yield admin
        .storage()
        .bucket()
        .file(destination)
        .save(file, {
        contentType,
        metadata: {
            metadata: {
                firebaseStorageDownloadTokens: token,
            },
        },
    });
    /*const res = await bucket.upload(tempFilePath, {
      destination,
      contentType,
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: token,
        },
      },
    });
    fs.promises.unlink(tempFilePath);*/
    const url = constants_1.Endpoints.firebaseFileStorage.uploadFile(destination, token);
    return url;
});
exports.uploadFile = uploadFile;
