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
exports.cronJobQuestionFinished = exports.cronJobCreateQuestion = void 0;
//TODO: the handling of timeZones right now is just as strings, not that good
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const constants_1 = require("../../constants");
const models_1 = require("../../db/models");
const services_1 = require("../../services");
const question_1 = require("../../services/question");
const connect_1 = require("./connect");
const invites_1 = require("./invites");
const SECONDS_UNTIL_QUESTION_INVITATION = 20;
const HOURS_UNTIL_QUESTION_FINISHED = 12;
const HOURS_UNTIL_NEW_QUESTION_MIN = 1;
const HOURS_UNTIL_NEW_QUESTION_MAX = 24;
const cronJobCreateQuestion = () => __awaiter(void 0, void 0, void 0, function* () {
    const { title, coverImageId } = yield (0, question_1.generateQuestionContent)();
    console.log("question To Create", "title", title);
    //timetostart is not actually necessary right now
    const timeToStart = (0, moment_timezone_1.default)()
        .tz(constants_1.FIRST_TIME_ZONE)
        .format(constants_1.DateConstants.formats.DATE_WITHOUT_TIMEZONE);
    const question = yield (0, services_1.dbCreate)(models_1.Question, {
        title,
        coverImageId,
        timeToStart,
    }
    // { include: [{ model: File, as: DBConstants.fields.question.COVER_IMAGE }] }
    );
    /*OLD: const dateToSendQuestionInvites = moment()
      .tz(FIRST_TIME_ZONE)
      .add(SECONDS_UNTIL_QUESTION_INVITATION, "seconds");*/
    //TODO: 5 is just for testing here
    //  dateToSendQuestionInvites.add(HOURS_UNTIL_QUESTION_INVITATION, "hours");
    yield (0, invites_1.inviteAllUsersToQuestion)(question);
    //OLD: scheduleCronJobsInviteToQuestion(dateToSendQuestionInvites, question);
    //TODO: change the time here, this so that after all answers are in we should start creating chats, better is if we would do this in the last timezone.
    const dateToFinishQuestion = (0, moment_timezone_1.default)()
        .tz(constants_1.FIRST_TIME_ZONE)
        .add(HOURS_UNTIL_QUESTION_FINISHED, "hours");
    //const dateToFinishQuestion = moment().tz(FIRST_TIME_ZONE).add(1, "minute");
    (0, services_1.scheduleOneJob)({
        date: dateToFinishQuestion.toDate(),
        timeZone: constants_1.FIRST_TIME_ZONE,
        cronJobFunction: exports.cronJobQuestionFinished,
        params: { questionId: question.id },
        type: "finishQuestion",
    });
});
exports.cronJobCreateQuestion = cronJobCreateQuestion;
const cronJobQuestionFinished = ({ questionId, }) => __awaiter(void 0, void 0, void 0, function* () {
    const question = yield (0, services_1.dbFindByPK)(models_1.Question, Number(questionId));
    if (!question) {
        return;
    }
    console.log("finishing question", question.title);
    yield (0, services_1.dbUpdate)(models_1.Question, { isFinished: true }, { where: { id: question.id } });
    const newUserChats = yield (0, connect_1.connectUsers)(question);
    yield (0, invites_1.inviteToChat)(newUserChats);
    const randomHoursToStartNewQuestion = Math.random() *
        (HOURS_UNTIL_NEW_QUESTION_MAX - HOURS_UNTIL_NEW_QUESTION_MIN) +
        HOURS_UNTIL_NEW_QUESTION_MIN;
    const dateToStartNewQuestion = (0, moment_timezone_1.default)()
        .tz(constants_1.FIRST_TIME_ZONE)
        .add(randomHoursToStartNewQuestion, "hours");
    (0, services_1.scheduleOneJob)({
        date: dateToStartNewQuestion.toDate(),
        timeZone: constants_1.FIRST_TIME_ZONE,
        cronJobFunction: exports.cronJobCreateQuestion,
        params: {},
        type: "createQuestion",
    });
});
exports.cronJobQuestionFinished = cronJobQuestionFinished;
