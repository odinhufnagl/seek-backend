import {
  ISocketServerIsActiveData,
  ISocketServerMessageData,
  ISocketServerTypingData,
  SocketMessageServer,
} from "../types";

type NewMessageProps = {
  message: string;
  chatId: number;
  userId: number;
};
type IsTypingProps = {
  isTyping: boolean;
  chatId: number;
  userId: number;
};
type IsActiveProps = {
  isActive: boolean;
  userId: number;
};

const SOCKET_MESSAGE = (senderId: number) => ({
  CHAT_MESSAGE: (data: NewMessageProps): SocketMessageServer => ({
    senderId,
    type: "message",
    data: data as ISocketServerMessageData,
  }),
  IS_TYPING: (data: IsTypingProps): SocketMessageServer => ({
    type: "typing",
    senderId,
    data: data as ISocketServerTypingData,
  }),
  IS_ACTIVE: (data: IsActiveProps): SocketMessageServer => ({
    type: "isActive",
    data: data as ISocketServerIsActiveData,
    senderId,
  }),
});

export { SOCKET_MESSAGE };
