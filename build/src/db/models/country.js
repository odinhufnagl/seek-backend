"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const sequelize_1 = require("sequelize");
class Country extends sequelize_1.Model {
    static _init(sequelize) {
        Country.init({
            name: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
            },
            code: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
        }, {
            modelName: "country",
            timestamps: true,
            sequelize,
        });
    }
}
exports.default = Country;
