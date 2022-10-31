//how data from server to client can look

interface ISocketServerIsActiveData {
  userId: number;
  isActive: boolean;
}

interface ISocketServerMessageData {
  userId: number;
  message: string;
  chatId: number;
}

interface ISocketServerTypingData {
  userId: number;
  isTyping: boolean;
  chatId: number;
}

//How the data from client can look

interface ISocketClientMessageData {
  userId: number;
  message: string;
  chatId: number;
}

interface ISocketClientTypingData {
  userId: number;
  isTyping: boolean;
  chatId: number;
}

//The types to use

type SocketMessageType = "message" | "typing" | "isActive";

type SocketMessage = {
  type: SocketMessageType;
  data:
    | ISocketClientMessageData
    | ISocketClientTypingData
    | ISocketServerIsActiveData
    | ISocketServerMessageData
    | ISocketServerTypingData;
};

export { SocketMessageType, SocketMessage };
