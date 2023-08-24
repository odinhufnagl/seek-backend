"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const sequelize_1 = require("sequelize");
const user_1 = __importDefault(require("./user"));
//TODO: maybe make this many-to-many with user so it is not tied to user
class NotificationToken extends sequelize_1.Model {
    static _init(sequelize) {
        NotificationToken.init({
            name: {
                type: core_1.DataTypes.STRING,
                primaryKey: true,
            },
        }, {
            modelName: "notificationToken",
            timestamps: true,
            sequelize,
        });
    }
    static associate() {
        NotificationToken.belongsTo(user_1.default);
    }
}
exports.default = NotificationToken;
