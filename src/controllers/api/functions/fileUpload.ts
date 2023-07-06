import { Response } from "express";
import { ApiNoBodyProvidedError } from "../../../classes";
import { ExternalStorageConstants } from "../../../constants";
import { uploadFile } from "../../../services";
import { Request } from "../../../types";

const singleFileUploadController = async (req: Request, res: Response) => {
  const file = req.file;

  if (!file) {
    throw new ApiNoBodyProvidedError();
  }

  const folderPath =
    ExternalStorageConstants.defaultUploadFolderPath.SERVER_UPLOADS;
  const url = await uploadFile(file, folderPath, file.mimetype);
  res.send({ url });
};

export default { singleFileUploadController };
