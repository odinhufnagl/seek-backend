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
exports.connectUsers = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const constants_1 = require("../../constants");
const models_1 = require("../../db/models");
const services_1 = require("../../services");
const userChatsFromUserPairs = (chats, userPairs) => {
    let userChats = [];
    chats.forEach((chat, i) => {
        var _a, _b;
        userChats.push({
            chatId: chat.id,
            userId: (_a = userPairs[i][0]) === null || _a === void 0 ? void 0 : _a.id,
        });
        userChats.push({
            chatId: chat.id,
            userId: (_b = userPairs[i][1]) === null || _b === void 0 ? void 0 : _b.id,
        });
    });
    return userChats;
};
const setUpChatsForUserPairs = (userPairs, time, questionId) => __awaiter(void 0, void 0, void 0, function* () {
    const chats = yield (0, services_1.dbBulkCreate)(models_1.Chat, userPairs.map(() => ({ questionId: questionId, timeToStart: time })));
    const userChats = yield (0, services_1.dbBulkCreate)(models_1.UserChat, userChatsFromUserPairs(chats, userPairs));
    return userChats;
});
const createMessagesFromAnswers = (answers, userChats) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield (0, services_1.dbBulkCreate)(models_1.Message, userChats
        .filter((uc) => answers.find((a) => a.userId == uc.userId))
        .map((uc) => {
        var _a;
        return {
            userId: uc.userId,
            chatId: uc.chatId,
            text: (_a = answers.find((a) => a.userId == uc.userId)) === null || _a === void 0 ? void 0 : _a.text,
        };
    }));
    return messages;
});
const connectUsers = (question) => __awaiter(void 0, void 0, void 0, function* () {
    const usersWithAnswer = yield (0, services_1.dbFindAll)(models_1.User, {
        include: [{ model: models_1.Answer, where: { questionId: question.id } }],
    });
    const userPairs = (0, services_1.generateUserPairs)(usersWithAnswer);
    //this with timeToStart is not necessary at the moment, but doesnt hurt
    const timeToStart = (0, moment_timezone_1.default)()
        .tz(constants_1.FIRST_TIME_ZONE)
        .format(constants_1.DateConstants.formats.DATE_WITHOUT_TIMEZONE);
    const newUserChats = yield setUpChatsForUserPairs(userPairs, timeToStart, question.id);
    yield createMessagesFromAnswers(usersWithAnswer.map((u) => u.answers[0]), newUserChats);
    console.log("newUserChats", newUserChats);
    //TODO: 5 is just for testing here
    //  firstTimeZoneDate.add(HOURS_UNTIL_QUESTION_INVITATION, "hours");
    //OLD: const dateToSendChatInvites = moment().tz(FIRST_TIME_ZONE).add(5, "seconds");
    //OLD: scheduleCronJobsInviteToChat(dateToSendChatInvites, question.id);
    return newUserChats;
});
exports.connectUsers = connectUsers;
