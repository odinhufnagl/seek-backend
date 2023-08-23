"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const sequelize_1 = require("sequelize");
class TimeZone extends sequelize_1.Model {
    static _init(sequelize) {
        TimeZone.init({
            name: {
                type: core_1.DataTypes.STRING,
                primaryKey: true,
            },
        }, {
            modelName: "timeZone",
            timestamps: true,
            sequelize,
        });
    }
}
exports.default = TimeZone;
