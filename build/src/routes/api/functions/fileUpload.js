"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constants_1 = require("../../../constants");
const fileUpload_1 = __importDefault(require("../../../controllers/api/functions/fileUpload"));
const middleware_1 = require("../../../middleware");
const wrappers_1 = require("../../../wrappers");
const router = express_1.default.Router();
router.post("/", (0, middleware_1.singleFileUploadMiddleware)(constants_1.FILE_UPLOAD_BODY_KEY), (0, wrappers_1.asyncWrapper)(fileUpload_1.default.singleFileUploadController));
router.post("/profileImage", (0, middleware_1.singleFileUploadMiddleware)(constants_1.FILE_UPLOAD_BODY_KEY), (0, wrappers_1.asyncWrapper)(fileUpload_1.default.profileImageFileUploadController));
exports.default = router;
