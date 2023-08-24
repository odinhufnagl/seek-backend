"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const sequelize_1 = require("sequelize");
const constants_1 = require("../../constants");
const answer_1 = __importDefault(require("./answer"));
const file_1 = __importDefault(require("./file"));
const user_1 = __importDefault(require("./user"));
const userQuestion_1 = __importDefault(require("./userQuestion"));
class Question extends sequelize_1.Model {
    static _init(sequelize) {
        Question.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
            },
            isFinished: {
                type: core_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            timeToStart: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            modelName: "question",
            timestamps: true,
            sequelize,
        });
    }
    static associate() {
        Question.belongsTo(file_1.default, {
            as: constants_1.DBConstants.fields.question.COVER_IMAGE,
        });
        Question.belongsToMany(user_1.default, {
            through: answer_1.default,
            as: constants_1.DBConstants.fields.question.ANSWERS,
        });
        Question.belongsToMany(user_1.default, { through: userQuestion_1.default });
        Question.hasMany(answer_1.default);
    }
}
exports.default = Question;
