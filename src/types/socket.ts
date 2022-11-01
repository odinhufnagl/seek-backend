//how data from server to client can look

interface ISocketServerIsActiveData {
  isActive: boolean;
}

interface ISocketServerMessageData {
  message: string;
  chatId: number;
}

interface ISocketServerTypingData {
  isTyping: boolean;
  chatId: number;
}

//How the data from client can look

interface ISocketClientIsActiveData {
  isActive: boolean;
}

interface ISocketClientMessageData {
  message: string;
  chatId: number;
}

interface ISocketClientTypingData {
  isTyping: boolean;
  chatId: number;
}

//The types to use

type SocketMessageType = "message" | "typing" | "isActive";

type SocketMessageServer = {
  type: SocketMessageType;
  senderId: number;
  data:
    | ISocketServerIsActiveData
    | ISocketServerMessageData
    | ISocketServerTypingData;
};

type SocketMessageClient = {
  recieverId: number;
  type: SocketMessageType;
  data:
    | ISocketClientMessageData
    | ISocketClientTypingData
    | ISocketClientIsActiveData;
};

export {
  SocketMessageType,
  SocketMessageClient,
  SocketMessageServer,
  ISocketServerIsActiveData,
  ISocketServerTypingData,
  ISocketServerMessageData,
  ISocketClientMessageData,
  ISocketClientTypingData,
  ISocketClientIsActiveData,
};
