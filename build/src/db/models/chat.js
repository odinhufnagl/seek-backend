"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const sequelize_1 = require("sequelize");
const message_1 = __importDefault(require("./message"));
const question_1 = __importDefault(require("./question"));
const user_1 = __importDefault(require("./user"));
const userChat_1 = __importDefault(require("./userChat"));
class Chat extends sequelize_1.Model {
    static _init(sequelize) {
        Chat.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            timeToStart: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            modelName: "chat",
            timestamps: true,
            sequelize,
        });
    }
    static associate() {
        Chat.belongsTo(question_1.default);
        Chat.belongsToMany(user_1.default, { through: userChat_1.default });
        Chat.hasMany(userChat_1.default);
        Chat.hasMany(message_1.default);
    }
}
exports.default = Chat;
