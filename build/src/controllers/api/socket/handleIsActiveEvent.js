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
const handleSocketIsActiveEvent = ({ sender, senderId, data, }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("is active or not");
    const { userId, isActive } = data;
    (0, services_1.updateUser)(userId, {
        isActive,
        lastActive: new Date().toISOString(),
    });
    //TODO: make this more efficient
    const allUserChats = yield (0, services_1.dbFindAll)(models_1.UserChat, {
        where: { userId },
        include: [{ model: models_1.Chat, include: [{ model: models_1.User }] }],
    });
    console.log("allUserChats", allUserChats);
    const userIdsToSendTo = [];
    allUserChats.map((u) => u.chat.users.map((u) => u.id !== userId && userIdsToSendTo.push(u.id)));
    userIdsToSendTo.push(userId);
    __1.socket.sendMessageToUsers(userIdsToSendTo, constants_1.SocketConstants.defaultMessages.isActive({ userId, isActive }));
    //TODO: send notification
    //to do this we first need to get token from reciever (hence the recieverId)
    //then we need to get senders name by accessing the db
    //and then the chatId from the data
});
exports.default = handleSocketIsActiveEvent;
