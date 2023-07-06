import { FindOptions } from "sequelize";
import { File } from "../db/models";

const DBPrimaryKeys = {
  fileType: {
    IMAGE: "image",
    VIDEO: "video",
  },
};

const DBFieldTypes = {
  area: {
    type: {
      WORLD: "world",
      RADIUS: "radius",
      COUNTRY: "country",
    },
  },
};

const DBdefaultValues = {
  file: {
    TYPE_NAME_PK: DBPrimaryKeys.fileType.IMAGE,
  },
} as const;

const DBthroughTables = {} as const;

const DBFields = {
  user: {
    PROFILE_IMAGE: "profileImage",
    ALBUMS: "albums",
    ALBUMS_CREATED: "albumsCreated",
  },
  file: {
    TYPE: "type",
  },
  question: {
    COVER_IMAGE: "coverImage",
  },
  area: {
    SUB_TYPE_ID: "subTypeId",
  },
} as const;

const DBdefaultOptions = {
  user: {
    find: () =>
      ({
        include: [
          {
            model: File,
            as: DBFields.user.PROFILE_IMAGE,
          },
        ],
      } as FindOptions),
  },
};

export class DBConstants {
  public static throughTables = DBthroughTables;
  public static defaultValues = DBdefaultValues;
  public static fields = DBFields;
  public static primaryKeys = DBPrimaryKeys;
  public static defaultOptions = DBdefaultOptions;
  public static fieldTypes = DBFieldTypes;
}

export default DBConstants;
