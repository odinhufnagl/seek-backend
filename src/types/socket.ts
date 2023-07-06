//how data from server to client can look

export interface SocketServerIsActiveData {
  isActive: boolean;
  userId: number;
}

export interface SocketServerMessageData {
  message: string;
  chatId: number;
  userId: number;
}

export interface SocketServerTypingData {
  isTyping: boolean;
  chatId: number;
  userId: number;
}

//How the data from client can look

export interface SocketClientIsActiveData {
  isActive: boolean;
}

export interface SocketClientMessageData {
  message: string;
  chatId: number;
}

export interface SocketClientTypingData {
  isTyping: boolean;
  chatId: number;
}

export type SocketMessageType = "message" | "typing" | "isActive";

export type SocketMessageServer = {
  type: SocketMessageType;
  senderId?: number;
  data?:
    | SocketServerIsActiveData
    | SocketServerMessageData
    | SocketServerTypingData;
};

export type SocketMessageClient = {
  recieverId: number;
  type: SocketMessageType;
  data:
    | SocketClientMessageData
    | SocketClientTypingData
    | SocketClientIsActiveData;
};
