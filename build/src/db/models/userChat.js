"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const chat_1 = __importDefault(require("./chat"));
const user_1 = __importDefault(require("./user"));
class UserChat extends sequelize_1.Model {
    static _init(sequelize) {
        UserChat.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            chatId: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            isInformed: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            isInvited: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            isBlocked: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            lastRead: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
        }, {
            modelName: "userChat",
            timestamps: true,
            sequelize,
        });
    }
    static associate() {
        UserChat.belongsTo(chat_1.default);
        UserChat.belongsTo(user_1.default);
    }
}
exports.default = UserChat;
