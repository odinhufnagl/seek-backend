import express from "express";

import { FILE_UPLOAD_BODY_KEY } from "../../../constants";
import controller from "../../../controllers/api/functions/fileUpload";
import { singleFileUploadMiddleware } from "../../../middleware";
import { asyncWrapper } from "../../../wrappers";

const router = express.Router();

router.get(
  "/",
  singleFileUploadMiddleware(FILE_UPLOAD_BODY_KEY),
  asyncWrapper(controller.singleFileUploadController)
);
export default router;
