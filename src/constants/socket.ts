import {
  ISocketServerIsActiveData,
  ISocketServerMessageData,
  ISocketServerTypingData,
  SocketMessageServer,
  SocketMessageType,
} from "../types";

const SOCKET_MESSAGE = (senderId: number) => ({
  NEW_MESSAGE: (data: ISocketServerMessageData): SocketMessageServer => ({
    senderId,
    type: "message",
    data,
  }),
  IS_TYPING: (data: ISocketServerTypingData): SocketMessageServer => ({
    type: "typing",
    senderId,
    data,
  }),
  IS_ACTIVE: (data: ISocketServerIsActiveData): SocketMessageServer => ({
    type: "typing",
    senderId,
    data,
  }),
});

export { SOCKET_MESSAGE };
