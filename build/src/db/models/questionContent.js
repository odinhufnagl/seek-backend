"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const sequelize_1 = require("sequelize");
const constants_1 = require("../../constants");
const file_1 = __importDefault(require("./file"));
class QuestionContent extends sequelize_1.Model {
    static _init(sequelize) {
        QuestionContent.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
            },
            used: {
                type: core_1.DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
        }, {
            modelName: "questionContent",
            timestamps: true,
            sequelize,
        });
    }
    static associate() {
        QuestionContent.belongsTo(file_1.default, {
            as: constants_1.DBConstants.fields.questionContent.COVER_IMAGE,
        });
    }
}
exports.default = QuestionContent;
