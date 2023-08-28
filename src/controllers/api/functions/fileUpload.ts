import { Response } from "express";
import sharp from "sharp";
import { ApiNoBodyProvidedError } from "../../../classes";
import { ExternalStorageConstants } from "../../../constants";
import { uploadFile } from "../../../services";
import { Request } from "../../../types";

const singleFileUploadController = async (req: Request, res: Response) => {
  const file = req.file;
  console.log("file", file);

  if (!file) {
    throw new ApiNoBodyProvidedError();
  }

  const folderPath =
    ExternalStorageConstants.defaultUploadFolderPath.SERVER_UPLOADS;
  const url = await uploadFile(file.buffer, folderPath, file.mimetype);
  res.send({ url });
};

const profileImageFileUploadController = async (
  req: Request,
  res: Response
) => {
  const file = req.file;
  console.log("file", file);

  if (!file) {
    throw new ApiNoBodyProvidedError();
  }

  const fileBuffer = file.buffer;
  const compressedBuffer = await sharp(fileBuffer)
    .resize({
      fit: sharp.fit.contain,
      width: ExternalStorageConstants.defaultSize.PROFILE_IMAGE.width,
    })
    .jpeg({ quality: ExternalStorageConstants.defaultQuality.PROFILE_IMAGE })
    .withMetadata()
    .toBuffer();

  const folderPath =
    ExternalStorageConstants.defaultUploadFolderPath.PROFILE_IMAGES;
  const url = await uploadFile(compressedBuffer, folderPath, file.mimetype);
  res.send({ url });
};

export default { profileImageFileUploadController, singleFileUploadController };
