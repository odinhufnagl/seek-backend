"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const core_1 = require("@sequelize/core");
class FileType extends sequelize_1.Model {
    static _init(sequelize) {
        FileType.init({
            name: {
                type: core_1.DataTypes.STRING,
                primaryKey: true,
            },
        }, {
            modelName: "fileType",
            timestamps: true,
            sequelize,
        });
    }
    static associate() { }
}
exports.default = FileType;
