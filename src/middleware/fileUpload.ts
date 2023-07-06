import multer from "multer";

export const singleFileUploadMiddleware = (key: string) =>
  multer({ storage: multer.memoryStorage() }).single(key);
