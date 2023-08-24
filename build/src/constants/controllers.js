"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllersConstants = void 0;
const models_1 = require("../db/models");
const db_1 = __importDefault(require("./db"));
const defaultDBOptions = {
    user: {
        get: () => ({
            include: [
                {
                    model: models_1.File,
                    as: db_1.default.fields.user.PROFILE_IMAGE,
                },
                //TODO: this should be default for location
                {
                    model: models_1.Location,
                    include: [{ model: models_1.Country }, { model: models_1.Coordinate }],
                },
            ],
        }),
    },
    usersChat: {
        getDetailed: () => ({}),
    },
};
class ControllersConstants {
}
exports.ControllersConstants = ControllersConstants;
ControllersConstants.defaultDBOptions = defaultDBOptions;
exports.default = ControllersConstants;
