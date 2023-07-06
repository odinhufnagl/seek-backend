import * as path from "path";
import * as fs from "fs";
import { bucket } from "../..";
import { Endpoints, PathConstants } from "../constants";
import { v4 as uuidv4 } from "uuid";
import { FilePath } from "../types";

export const uploadFile = async (
  file: Express.Multer.File,
  folderPath: string,
  contentType: string
): Promise<FilePath> => {
  const token = uuidv4();
  const ext = file.originalname.split(".").pop();
  const fileName = `${uuidv4()}.${ext}`;
  const destination = path.join(folderPath, fileName);
  const tempFilePath = path.join(
    PathConstants.defaultFolderPath.TEMP_FILE_FOLDER,
    fileName
  );
  await fs.promises.writeFile(tempFilePath, file.buffer);
  const res = await bucket.upload(tempFilePath, {
    destination,
    contentType,
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: token,
      },
    },
  });
  fs.promises.unlink(tempFilePath);
  const url = Endpoints.firebaseFileStorage.uploadFile(destination, token);
  return url;
};
