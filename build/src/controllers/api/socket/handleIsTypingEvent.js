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
const __1 = require("../../../..");
const constants_1 = require("../../../constants");
const models_1 = require("../../../db/models");
const services_1 = require("../../../services");
const handleSocketIsTypingEvent = ({ sender, senderId, data, }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("is typing");
    const { chatId, userId, isTyping } = data;
    const chat = yield (0, services_1.dbFindByPK)(models_1.Chat, chatId, { include: [{ model: models_1.User }] });
    const otherUser = chat === null || chat === void 0 ? void 0 : chat.users.find((u) => u.id !== userId);
    if (!otherUser) {
        return;
    }
    __1.socket.sendMessageToUsers(otherUser === null || otherUser === void 0 ? void 0 : otherUser.id, constants_1.SocketConstants.defaultMessages.isTyping({ chatId, isTyping, userId }));
    //TODO: send notification
    //to do this we first need to get token from reciever (hence the recieverId)
    //then we need to get senders name by accessing the db
    //and then the chatId from the data
});
exports.default = handleSocketIsTypingEvent;
