"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const sequelize_1 = require("sequelize");
const constants_1 = require("../../constants");
const countryArea_1 = __importDefault(require("./countryArea"));
const radiusArea_1 = __importDefault(require("./radiusArea"));
class Area extends sequelize_1.Model {
    static _init(sequelize) {
        Area.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            type: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
                defaultValue: constants_1.DBConstants.fieldTypes.area.type.WORLD,
            },
        }, {
            modelName: "area",
            timestamps: true,
            sequelize,
        });
        Area.addHook("afterFind", (findResult) => {
            if (!Array.isArray(findResult))
                findResult = [findResult];
            for (const instance of findResult) {
                if (instance.type === constants_1.DBConstants.fieldTypes.area.type.RADIUS &&
                    instance.radiusArea !== undefined) {
                    instance.subType = instance.radiusArea;
                }
                else if (instance.type === constants_1.DBConstants.fieldTypes.area.type.COUNTRY &&
                    instance.countryArea !== undefined) {
                    instance.subType = instance.countryArea;
                }
                // To prevent mistakes:
                delete instance.radiusArea;
                delete instance.dataValues.radiusArea;
                delete instance.countryArea;
                delete instance.dataValues.countryArea;
            }
        });
    }
    static associate() {
        Area.belongsTo(countryArea_1.default, {
            foreignKey: constants_1.DBConstants.fields.area.SUB_TYPE_ID,
            constraints: false,
        });
        Area.belongsTo(radiusArea_1.default, {
            foreignKey: constants_1.DBConstants.fields.area.SUB_TYPE_ID,
            constraints: false,
        });
    }
}
exports.default = Area;
