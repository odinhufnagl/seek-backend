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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const classes_1 = require("../../../../../classes");
const constants_1 = require("../../../../../constants");
const models_1 = require("../../../../../db/models");
const services_1 = require("../../../../../services");
const getNewQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a;
    const userId = Number(req.params.id);
    const user = yield (0, services_1.dbFindByPK)(models_1.User, userId);
    if (!user) {
        throw new classes_1.ApiDatabaseNotFoundError();
    }
    const questions = yield (0, services_1.dbFindAll)(models_1.Question, {
        replacements: { userId },
        //TODO: this where seems slow. The literal should be improved, or implemented without pure SQL.
        where: {
            /*id: {
              [Op.notIn]: literal(
                `(SELECT "questionId" FROM "answers" WHERE "answers"."userId" = :userId)`
              ),
            },*/
            isFinished: false,
        },
        include: [{ model: models_1.File, as: constants_1.DBConstants.fields.question.COVER_IMAGE }],
        order: [["createdAt", "DESC"]],
    });
    console.log("questions", questions);
    try {
        //Check which one that time has passed, starting with latest
        for (var questions_1 = __asyncValues(questions), questions_1_1; questions_1_1 = yield questions_1.next(), !questions_1_1.done;) {
            const question = questions_1_1.value;
            const usersTime = (0, moment_timezone_1.default)((0, moment_timezone_1.default)()
                .tz(user.timeZone)
                .format(constants_1.DateConstants.formats.DATE_WITHOUT_TIMEZONE), constants_1.DateConstants.formats.DATE_WITHOUT_TIMEZONE);
            console.log("usersTime", usersTime);
            const questionTime = (0, moment_timezone_1.default)(question.timeToStart, constants_1.DateConstants.formats.DATE_WITHOUT_TIMEZONE);
            console.log("questionTime", questionTime);
            if (questionTime.isBefore(usersTime)) {
                const usersAnswer = yield (0, services_1.dbFindOne)(models_1.Answer, {
                    where: { userId, questionId: question.id },
                });
                res.send({ usersAnswer, question });
                return;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (questions_1_1 && !questions_1_1.done && (_a = questions_1.return)) yield _a.call(questions_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    res.send(null);
});
exports.default = { getNewQuestion };
