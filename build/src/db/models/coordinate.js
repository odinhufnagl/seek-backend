"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const core_1 = require("@sequelize/core");
class Coordinate extends sequelize_1.Model {
    static _init(sequelize) {
        Coordinate.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            latitude: {
                type: core_1.DataTypes.FLOAT,
            },
            longitude: {
                type: core_1.DataTypes.FLOAT,
            },
        }, {
            modelName: "coordinate",
            timestamps: true,
            sequelize,
        });
    }
}
exports.default = Coordinate;
