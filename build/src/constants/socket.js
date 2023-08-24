"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketConstants = void 0;
class SocketConstants {
}
exports.SocketConstants = SocketConstants;
SocketConstants.defaultMessages = {
    chatMessage: ({ chatId, message, userId, messageId, }) => ({
        type: "message",
        data: {
            chatId,
            message,
            type: "message",
            messageId,
            userId,
        },
    }),
    isTyping: ({ chatId, isTyping, userId, }) => ({
        type: "typing",
        data: { chatId, isTyping, type: "typing", userId },
    }),
    isActive: ({ isActive, userId, }) => ({
        type: "isActive",
        data: { isActive, type: "isActive", userId },
    }),
};
