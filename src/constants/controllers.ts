import { FindOptions } from "sequelize";
import { File } from "../db/models";
import DBConstants from "./db";
const defaultDBOptions = {
  user: {
    get: () =>
      ({
        include: [
          {
            model: File,
            as: DBConstants.fields.user.PROFILE_IMAGE,
          },
        ],
      } as FindOptions),
  },
};

export class ControllersConstants {
  public static defaultDBOptions = defaultDBOptions;
}

export default ControllersConstants;
