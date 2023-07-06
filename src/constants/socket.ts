import {
  SocketServerMessageData,
  SocketMessageServer,
  SocketMessageType,
} from "../types";

type ChatMessageProps = {
  message: string;
  chatId: number;
  userId: number;
  senderId: number;
};
type IsTypingProps = {
  isTyping: boolean;
  chatId: number;
  userId: number;
  senderId: number;
};
type IsActiveProps = {
  isActive: boolean;
  userId: number;
  senderId: number;
};

class SocketConstants {
  public static defaultMessages = {
    chatMessage: ({
      senderId,
      ...props
    }: ChatMessageProps): SocketMessageServer => ({
      senderId,
      type: "message",
      data: props as SocketServerMessageData,
    }),
    isTyping: ({ senderId, ...props }: IsTypingProps): SocketMessageServer => ({
      type: "typing",
      senderId,
      data: props,
    }),
    isActive: ({ senderId, ...props }: IsActiveProps): SocketMessageServer => ({
      senderId,
      type: "isActive",
      data: props,
    }),
  };
}

export { SocketConstants };
