import {
  DefaultSocketIsActiveProps,
  DefaultSocketIsTypingProps,
  DefaultSocketNewMessageProps,
  SocketServerMessageIsActive,
  SocketServerMessageIsTyping,
  SocketServerMessageUserMessage,
} from "../types";

class SocketConstants {
  public static defaultMessages = {
    chatMessage: ({
      chatId,
      message,
      userId,
      messageId,
    }: DefaultSocketNewMessageProps): SocketServerMessageUserMessage => ({
      type: "message",
      data: {
        chatId,
        message,
        type: "message",
        messageId,
        userId,
      },
    }),
    isTyping: ({
      chatId,
      isTyping,
      userId,
    }: DefaultSocketIsTypingProps): SocketServerMessageIsTyping => ({
      type: "typing",

      data: { chatId, isTyping, type: "typing", userId },
    }),
    isActive: ({
      isActive,
      userId,
    }: DefaultSocketIsActiveProps): SocketServerMessageIsActive => ({
      type: "isActive",
      data: { isActive, type: "isActive", userId },
    }),
  };
}

export { SocketConstants };
