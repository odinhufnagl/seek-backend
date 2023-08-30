"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const constants_1 = require("../../constants");
const user_1 = __importDefault(require("./user"));
class UserBlocking extends sequelize_1.Model {
    static _init(sequelize) {
        UserBlocking.init({
            blockerId: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            blockedId: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
        }, {
            modelName: "userBlocking",
            timestamps: true,
            sequelize,
        });
    }
    static associate() {
        UserBlocking.belongsTo(user_1.default, {
            as: constants_1.DBConstants.fields.userBlocking.BLOCKED,
            foreignKey: constants_1.DBConstants.fields.userBlocking.BLOCKED_ID,
        });
        UserBlocking.belongsTo(user_1.default, {
            as: constants_1.DBConstants.fields.userBlocking.BLOCKER,
            foreignKey: constants_1.DBConstants.fields.userBlocking.BLOCKER_ID,
        });
    }
}
exports.default = UserBlocking;
