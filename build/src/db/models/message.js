"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const sequelize_1 = require("sequelize");
const chat_1 = __importDefault(require("./chat"));
const readMessage_1 = __importDefault(require("./readMessage"));
const user_1 = __importDefault(require("./user"));
class Message extends sequelize_1.Model {
    static _init(sequelize) {
        Message.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            text: {
                type: core_1.DataTypes.STRING,
                allowNull: true,
            },
        }, {
            modelName: "message",
            timestamps: true,
            sequelize,
        });
    }
    static associate() {
        Message.belongsTo(chat_1.default);
        Message.belongsTo(user_1.default);
        Message.belongsToMany(user_1.default, { through: readMessage_1.default });
        Message.hasMany(readMessage_1.default);
    }
}
exports.default = Message;
