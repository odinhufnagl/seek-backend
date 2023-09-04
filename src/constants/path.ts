import path from "path";

const { dirname } = require("path");
const appDir = dirname(require.main?.filename);
const defaultFolderPath = {
  TEMP_FILE_FOLDER: path.join(appDir, "assets/temp"),
  EMAIL_TEMPLATES_FOLDER: path.join(appDir, "assets/emailTemplates"),
} as const;

export class PathConstants {
  public static defaultFolderPath = defaultFolderPath;
}
