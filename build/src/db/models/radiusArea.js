"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const sequelize_1 = require("sequelize");
const constants_1 = require("../../constants");
const area_1 = __importDefault(require("./area"));
class RadiusArea extends sequelize_1.Model {
    static _init(sequelize) {
        RadiusArea.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            radius: {
                type: core_1.DataTypes.FLOAT,
                allowNull: true,
            },
        }, {
            modelName: "radiusArea",
            timestamps: true,
            sequelize,
        });
    }
    static associate() {
        RadiusArea.hasMany(area_1.default, {
            foreignKey: constants_1.DBConstants.fields.area.SUB_TYPE_ID,
            constraints: false,
            scope: { type: constants_1.DBConstants.fieldTypes.area.type.RADIUS },
        });
    }
}
exports.default = RadiusArea;
