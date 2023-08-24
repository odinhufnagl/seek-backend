"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQuestionContent = void 0;
const sequelize_1 = require("sequelize");
const constants_1 = require("../constants");
const models_1 = require("../db/models");
const db_1 = require("./db/db");
const generateQuestionContent = () => __awaiter(void 0, void 0, void 0, function* () {
    const randomQuestionContent = (yield (0, db_1.dbFindAll)(models_1.QuestionContent, {
        order: sequelize_1.Sequelize.literal("random()"),
        limit: 1,
        include: [
            { model: models_1.File, as: constants_1.DBConstants.fields.questionContent.COVER_IMAGE },
        ],
        where: { used: false },
    }))[0];
    yield (0, db_1.dbUpdate)(models_1.QuestionContent, { used: true }, { where: { id: randomQuestionContent.id } });
    return randomQuestionContent;
});
exports.generateQuestionContent = generateQuestionContent;
