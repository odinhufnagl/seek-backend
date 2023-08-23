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
exports.sendMessage = void 0;
const __1 = require("../..");
const constants_1 = require("../constants");
const models_1 = require("../db/models");
const db_1 = require("./db/db");
const notification_1 = require("./notification");
const sendMessage = (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const res = yield (0, db_1.dbCreate)(models_1.Message, message, {});
    const messageCreated = yield (0, db_1.dbFindByPK)(models_1.Message, res.id, {
        include: [{ model: models_1.Chat, include: [{ model: models_1.User }] }],
    });
    if (!messageCreated) {
        return null;
    }
    console.log("res", res);
    const otherUser = (_a = messageCreated.chat) === null || _a === void 0 ? void 0 : _a.users.find((u) => u.id !== (res === null || res === void 0 ? void 0 : res.userId));
    const user = (_b = messageCreated.chat) === null || _b === void 0 ? void 0 : _b.users.find((u) => u.id === (res === null || res === void 0 ? void 0 : res.userId));
    if (!otherUser || !user) {
        return null;
    }
    console.log("otherUser", otherUser);
    __1.socket.sendMessageToUsers([otherUser === null || otherUser === void 0 ? void 0 : otherUser.id, res.userId], constants_1.SocketConstants.defaultMessages.chatMessage({
        chatId: res.chatId,
        message: res.text,
        userId: res.userId,
        messageId: messageCreated.id,
    }));
    (0, notification_1.sendNotificationToUsers)([otherUser.id], () => constants_1.NotificationConstants.defaultNotifications.message({
        chatId: res.chatId,
        message: res.text,
        userId: res.userId,
        userName: user.name,
        language: "en",
    }));
    console.log("message", message);
    return res;
});
exports.sendMessage = sendMessage;
