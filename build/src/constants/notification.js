"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationConstants = void 0;
const translations_1 = require("./translations");
const NotificationContent = (language) => ({
    chatMessage: ({ userName, message, }) => ({
        title: (0, translations_1.translations)({ userName })[language].notification.chatMessage
            .title,
        body: message,
    }),
    newChat: ({ userName, questionText, }) => ({
        title: (0, translations_1.translations)({ userName })[language].notification.newChat.title,
        body: questionText,
    }),
    isTyping: ({ userName }) => ({
        title: (0, translations_1.translations)({ userName })[language].notification.isTyping.title,
        body: "wihoo",
    }),
    dailyQuestion: ({ questionText, }) => ({
        title: (0, translations_1.translations)()[language].notification.dailyQuestion.title,
        body: questionText,
    }),
});
const convertValuesToStrings = (object) => {
    const json = JSON.stringify(object);
    const withStrings = JSON.parse(json, (key, val) => typeof val !== "object" && val !== null ? String(val) : val);
    return withStrings;
};
class NotificationConstants {
}
exports.NotificationConstants = NotificationConstants;
_a = NotificationConstants;
NotificationConstants.defaultNotificationsContent = NotificationContent;
NotificationConstants.defaultNotifications = {
    newChat: ({ userName, chatId, questionText, language, }) => ({
        payLoad: {
            data: {
                chatId: String(chatId),
                type: "newChat",
            },
            notification: Object.assign({}, _a.defaultNotificationsContent(language).newChat({
                userName,
                questionText,
            })),
        },
    }),
    message: ({ message, userName, userId, chatId, language, }) => ({
        payLoad: {
            data: {
                chatId: String(chatId),
                userId: String(userId),
                message,
                type: "message",
            },
            notification: Object.assign({}, _a.defaultNotificationsContent(language).chatMessage({
                userName,
                message,
            })),
        },
    }),
    typing: ({ userId, userName, chatId, isTyping, language, }) => ({
        payLoad: {
            data: {
                userId: String(userId),
                chatId: String(chatId),
                isTyping: String(isTyping),
                type: "typing",
            },
            notification: Object.assign({}, _a.defaultNotificationsContent(language).isTyping({
                userName,
            })),
        },
    }),
    isActive: () => ({}),
    dailyQuestion: ({ language, questionText, }) => ({
        payLoad: {
            data: { type: "dailyQuestion" },
            notification: Object.assign({}, _a.defaultNotificationsContent(language).dailyQuestion({
                questionText,
            })),
        },
    }),
};
