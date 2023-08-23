"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class ReadMessage extends sequelize_1.Model {
    static _init(sequelize) {
        ReadMessage.init({}, {
            modelName: "readMessage",
            timestamps: true,
            sequelize,
        });
    }
    static associate() { }
}
exports.default = ReadMessage;
