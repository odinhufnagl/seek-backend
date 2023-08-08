import { FindOptions } from "sequelize";
import { Coordinate, Country, File, Location } from "../db/models";
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
          //TODO: this should be default for location
          {
            model: Location,
            include: [{ model: Country }, { model: Coordinate }],
          },
        ],
      } as FindOptions),
  },
  usersChat: {
    getDetailed: () => ({}),
  },
};

export class ControllersConstants {
  public static defaultDBOptions = defaultDBOptions;
}

export default ControllersConstants;
