import * as admin from "firebase-admin";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import { Endpoints } from "../constants";
import { FilePath } from "../types";
export const uploadFile = async (
  file: string | Buffer,
  folderPath: string,
  contentType: string
): Promise<FilePath> => {
  const token = uuidv4();

  const fileName = `${uuidv4()}`;
  const destination = path.join(folderPath, fileName);
  /* const tempFilePath = path.join(
    PathConstants.defaultFolderPath.TEMP_FILE_FOLDER,
    fileName
  );*/
  // const res = await fs.promises.writeFile(tempFilePath, file.buffer);
  await admin
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
  const url = Endpoints.firebaseFileStorage.uploadFile(destination, token);
  return url;
};
