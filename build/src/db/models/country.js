"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const core_1 = require("@sequelize/core");
class Country extends sequelize_1.Model {
    static _init(sequelize) {
        Country.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: core_1.DataTypes.STRING,
            },
            code: {
                type: core_1.DataTypes.STRING,
            },
        }, {
            modelName: "country",
            timestamps: true,
            sequelize,
        });
    }
}
exports.default = Country;
