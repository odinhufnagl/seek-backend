import { ISocketServerMessageData, SocketMessageServer } from "../types";

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

const SOCKET_MESSAGE = {
  CHAT_MESSAGE: ({
    senderId,
    ...props
  }: ChatMessageProps): SocketMessageServer => ({
    senderId,
    type: "message",
    data: props as ISocketServerMessageData,
  }),
  IS_TYPING: ({ senderId, ...props }: IsTypingProps): SocketMessageServer => ({
    type: "typing",
    senderId,
    data: props,
  }),
  IS_ACTIVE: ({ senderId, ...props }: IsActiveProps): SocketMessageServer => ({
    senderId,
    type: "isActive",
    data: props,
  }),
};

export { SOCKET_MESSAGE };
