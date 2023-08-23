"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const sequelize_1 = require("sequelize");
const constants_1 = require("../../constants");
const fileType_1 = __importDefault(require("./fileType"));
class File extends sequelize_1.Model {
    static _init(sequelize) {
        File.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: core_1.DataTypes.STRING,
                allowNull: true,
            },
            url: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
            },
            typeName: {
                type: core_1.DataTypes.STRING,
                defaultValue: constants_1.DBConstants.defaultValues.file.TYPE_NAME_PK,
            },
        }, {
            modelName: "file",
            timestamps: true,
            sequelize,
        });
    }
    static associate() {
        File.belongsTo(fileType_1.default, {
            as: constants_1.DBConstants.fields.file.TYPE,
        });
    }
}
exports.default = File;
