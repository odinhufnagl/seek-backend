import { SocketMessageType } from "../types";

const SOCKET_MESSAGE_TYPE: Record<string, SocketMessageType> = {
  IS_ACTIVE: "isActive",
  MESSAGE: "message",
  TYPING: "typing",
};

export { SOCKET_MESSAGE_TYPE };
