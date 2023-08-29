"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalStorageConstants = void 0;
class ExternalStorageConstants {
}
exports.ExternalStorageConstants = ExternalStorageConstants;
ExternalStorageConstants.defaultUploadFolderPath = {
    SERVER_UPLOADS: "serverUploads",
    PROFILE_IMAGES: "profileImages",
};
ExternalStorageConstants.defaultQuality = {
    PROFILE_IMAGE: 80,
};
ExternalStorageConstants.defaultSize = {
    PROFILE_IMAGE: { width: 800, height: null },
};
