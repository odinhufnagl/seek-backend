import path from "path";

const { dirname } = require("path");
//const appDir = dirname(require.main?.filename);
//TODO: BAD BAD just temporary
const appDir = "../../";
const defaultFolderPath = {
  TEMP_FILE_FOLDER: path.join(appDir, "assets/temp"),
} as const;

export class PathConstants {
  public static defaultFolderPath = defaultFolderPath;
}
