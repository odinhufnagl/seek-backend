"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConstants = void 0;
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
};
const DBthroughTables = {};
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
};
const DBdefaultOptions = {
    user: {},
};
class DBConstants {
}
exports.DBConstants = DBConstants;
DBConstants.throughTables = DBthroughTables;
DBConstants.defaultValues = DBdefaultValues;
DBConstants.fields = DBFields;
DBConstants.primaryKeys = DBPrimaryKeys;
DBConstants.defaultOptions = DBdefaultOptions;
DBConstants.fieldTypes = DBFieldTypes;
exports.default = DBConstants;
