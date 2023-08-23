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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const sequelize_1 = require("sequelize");
const classes_1 = require("../../../../../classes");
const constants_1 = require("../../../../../constants");
const models_1 = require("../../../../../db/models");
const services_1 = require("../../../../../services");
const getNewQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.id);
    const user = yield (0, services_1.dbFindByPK)(models_1.User, userId);
    if (!user) {
        throw new classes_1.ApiDatabaseNotFoundError();
    }
    const questions = yield (0, services_1.dbFindAll)(models_1.Question, {
        replacements: { userId },
        //TODO: this where seems slow. The literal should be improved, or implemented without pure SQL.
        where: {
            id: {
                [sequelize_1.Op.notIn]: (0, sequelize_1.literal)(`(SELECT "questionId" FROM "answers" WHERE "answers"."userId" = :userId)`),
            },
            isFinished: false,
        },
        include: [{ model: models_1.File, as: constants_1.DBConstants.fields.question.COVER_IMAGE }],
        order: [["createdAt", "DESC"]],
    });
    console.log("questions", questions);
    //Check which one that time has passed, starting with latest
    for (const question of questions) {
        const usersTime = (0, moment_timezone_1.default)((0, moment_timezone_1.default)()
            .tz(user.timeZone)
            .format(constants_1.DateConstants.formats.DATE_WITHOUT_TIMEZONE), constants_1.DateConstants.formats.DATE_WITHOUT_TIMEZONE);
        console.log("usersTime", usersTime);
        const questionTime = (0, moment_timezone_1.default)(question.timeToStart, constants_1.DateConstants.formats.DATE_WITHOUT_TIMEZONE);
        console.log("questionTime", questionTime);
        if (questionTime.isBefore(usersTime)) {
            res.send(question);
            return;
        }
    }
    res.send(null);
});
exports.default = { getNewQuestion };
