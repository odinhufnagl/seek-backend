"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const sequelize_1 = require("sequelize");
const area_1 = __importDefault(require("./area"));
const question_1 = __importDefault(require("./question"));
const user_1 = __importDefault(require("./user"));
class Answer extends sequelize_1.Model {
    static _init(sequelize) {
        Answer.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            userId: {
                type: core_1.DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            questionId: {
                type: core_1.DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            text: {
                type: core_1.DataTypes.TEXT("long"),
                allowNull: true,
            },
            isPrivate: {
                type: core_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        }, {
            modelName: "answer",
            timestamps: true,
            sequelize,
        });
    }
    static associate() {
        Answer.belongsTo(question_1.default);
        Answer.belongsTo(user_1.default);
        Answer.belongsTo(area_1.default);
    }
}
exports.default = Answer;
