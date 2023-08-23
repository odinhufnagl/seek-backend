"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const sequelize_1 = require("sequelize");
const constants_1 = require("../../constants");
const area_1 = __importDefault(require("./area"));
const country_1 = __importDefault(require("./country"));
class CountryArea extends sequelize_1.Model {
    static _init(sequelize) {
        CountryArea.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
        }, {
            modelName: "countryArea",
            timestamps: true,
            sequelize,
        });
    }
    static associate() {
        CountryArea.hasMany(area_1.default, {
            foreignKey: constants_1.DBConstants.fields.area.SUB_TYPE_ID,
            constraints: false,
            scope: {
                type: constants_1.DBConstants.fieldTypes.area.type.COUNTRY,
            },
        });
        CountryArea.belongsTo(country_1.default);
    }
}
exports.default = CountryArea;
