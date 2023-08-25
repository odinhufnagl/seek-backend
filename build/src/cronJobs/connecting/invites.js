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
exports.scheduleCronJobsInviteToQuestion = exports.scheduleCronJobsInviteToChat = exports.inviteToQuestionByTimezone = exports.inviteToChatByTimezone = exports.inviteAllUsersToQuestion = exports.inviteToQuestion = exports.inviteToChat = void 0;
//TODO: the handling of timeZones right now is just as strings, not that good
const sequelize_1 = require("sequelize");
const constants_1 = require("../../constants");
const models_1 = require("../../db/models");
const services_1 = require("../../services");
//TODO: create types for the models that doesnt have all the extra stuff, just their values
//TODO: fix translations with questionText. Dont hardcode language, should be based on users language. Should not send questionText to notification, send translations
const inviteToChat = (userChats) => __awaiter(void 0, void 0, void 0, function* () {
    const userChatsUpdated = yield (0, services_1.dbUpdate)(models_1.UserChat, { isInvited: true }, {
        where: { id: { [sequelize_1.Op.in]: userChats.map((uc) => uc.id) } },
    });
    //TODO: bad bad bad! Should restructure it in some way
    const extendedUserChats = yield (0, services_1.dbFindAll)(models_1.UserChat, {
        where: { id: { [sequelize_1.Op.in]: userChats.map((uc) => uc.id) } },
        include: [{ model: models_1.Chat, include: [{ model: models_1.User }, { model: models_1.Question }] }],
    });
    console.log("extendedUserChats", extendedUserChats);
    for (const userChat of extendedUserChats) {
        const otherUser = userChat.chat.users.find((u) => u.id !== userChat.userId);
        console.log("otherUser", otherUser);
        if (!otherUser) {
            continue;
        }
        (0, services_1.sendNotificationToUsers)([userChat.userId], (user) => constants_1.NotificationConstants.defaultNotifications.newChat({
            chatId: userChat.chatId,
            language: (0, services_1.serverLanguageFromDBLanguage)(user.language),
            questionText: userChat.chat.question.title,
            userName: otherUser.name,
        }));
    }
});
exports.inviteToChat = inviteToChat;
const inviteToQuestion = (users, question) => __awaiter(void 0, void 0, void 0, function* () {
    (0, services_1.sendNotificationToUsers)(users.map((u) => u.id), (user) => constants_1.NotificationConstants.defaultNotifications.dailyQuestion({
        language: "en",
        questionText: question.title,
    }));
});
exports.inviteToQuestion = inviteToQuestion;
const inviteAllUsersToQuestion = (question) => __awaiter(void 0, void 0, void 0, function* () {
    //send notification to ALL USERS
    //TODO: bad bad
    const users = yield (0, services_1.dbFindAll)(models_1.User, { attributes: ["id"] });
    (0, services_1.sendNotificationToUsers)(users.map((u) => u.id), (user) => constants_1.NotificationConstants.defaultNotifications.dailyQuestion({
        language: "en",
        questionText: question.title,
    }));
});
exports.inviteAllUsersToQuestion = inviteAllUsersToQuestion;
const inviteToChatByTimezone = (questionId, timeZoneName) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inviting to chat", timeZoneName);
    const usersChatsInTimeZone = yield (0, services_1.dbFindAll)(models_1.UserChat, {
        where: { isInvited: false },
        include: [
            {
                model: models_1.User,
                where: { timeZone: timeZoneName },
            },
            {
                model: models_1.Chat,
                where: { questionId },
                include: [
                    { model: models_1.User, attributes: ["id", "name"] },
                    { model: models_1.Question, attributes: ["id", "title"] },
                ],
            },
        ],
    });
    yield (0, exports.inviteToChat)(usersChatsInTimeZone);
});
exports.inviteToChatByTimezone = inviteToChatByTimezone;
const inviteToQuestionByTimezone = (question, timeZoneName) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inviting to question", timeZoneName);
    const usersInTimeZone = yield (0, services_1.dbFindAll)(models_1.User, {
        where: { timeZone: timeZoneName },
    });
    console.log("usersInTimezone", usersInTimeZone);
    yield (0, exports.inviteToQuestion)(usersInTimeZone, question);
});
exports.inviteToQuestionByTimezone = inviteToQuestionByTimezone;
const scheduleCronJobsInviteToChat = (date, questionId) => {
    (0, services_1.scheduleJobsOnTimezones)(date, constants_1.TIMEZONES, constants_1.TIMEZONES.reduce((acc, tz) => {
        acc[tz] = () => (0, exports.inviteToChatByTimezone)(questionId, tz);
        return acc;
    }, {}));
};
exports.scheduleCronJobsInviteToChat = scheduleCronJobsInviteToChat;
const scheduleCronJobsInviteToQuestion = (date, question) => {
    (0, services_1.scheduleJobsOnTimezones)(date, constants_1.TIMEZONES, constants_1.TIMEZONES.reduce((acc, tz) => {
        acc[tz] = () => (0, exports.inviteToQuestionByTimezone)(question, tz);
        return acc;
    }, {}));
};
exports.scheduleCronJobsInviteToQuestion = scheduleCronJobsInviteToQuestion;
