"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const question_1 = __importDefault(require("./question"));
const user_1 = __importDefault(require("./user"));
class UserQuestion extends sequelize_1.Model {
    static _init(sequelize) {
        UserQuestion.init({
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
        }, {
            modelName: "userQuestion",
            timestamps: true,
            sequelize,
        });
    }
    static associate() {
        UserQuestion.belongsTo(question_1.default);
        UserQuestion.belongsTo(user_1.default);
    }
}
exports.default = UserQuestion;
