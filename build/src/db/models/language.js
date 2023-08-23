"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const sequelize_1 = require("sequelize");
class Language extends sequelize_1.Model {
    static _init(sequelize) {
        Language.init({
            name: {
                type: core_1.DataTypes.STRING,
                primaryKey: true,
            },
        }, {
            modelName: "language",
            timestamps: true,
            sequelize,
        });
    }
}
exports.default = Language;
