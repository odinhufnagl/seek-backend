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
    ANSWERS: "answers",
    CURRENT_LOCATION: "currentLocation",
    HAS_BLOCKED: "hasBlocked",
    IS_BLOCKED_BY: "isBlockedBy",
  },
  file: {
    TYPE: "type",
  },
  question: {
    COVER_IMAGE: "coverImage",
    ANSWERS: "answers",
  },
  questionContent: {
    COVER_IMAGE: "coverImage",
  },
  area: {
    SUB_TYPE_ID: "subTypeId",
  },
  userBlocking: {
    BLOCKED: "blocked",
    BLOCKER: "blocker",
    BLOCKED_ID: "blockedId",
    BLOCKER_ID: "blockerId",
  },
} as const;

const DBdefaultOptions = {
  user: {},
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
