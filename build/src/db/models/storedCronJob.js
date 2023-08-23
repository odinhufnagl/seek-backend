"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const sequelize_1 = require("sequelize");
class StoredCronJob extends sequelize_1.Model {
    static _init(sequelize) {
        StoredCronJob.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            type: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
            },
            params: {
                type: core_1.DataTypes.JSON,
            },
            timeZone: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
            },
            date: {
                type: core_1.DataTypes.DATE,
                allowNull: false,
            },
        }, {
            modelName: "storedCronJob",
            timestamps: true,
            sequelize,
        });
    }
    static associate() { }
}
exports.default = StoredCronJob;
