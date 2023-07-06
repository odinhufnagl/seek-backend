import DBConstants from "./db";

const defaultDBOptions = {
  user: {
    get: DBConstants.defaultOptions.user.find,
  },
};

export class ControllersConstants {
  public static defaultDBOptions = defaultDBOptions;
}

export default ControllersConstants;
