import Socket from "ws";
import { SOCKET_MESSAGE, TOKEN_HEADER_KEY } from "../constants";
import {
  ISocketClientMessageData,
  ISocketClientTypingData,
  SocketMessageClient,
  SocketMessageServer,
} from "../types";
import { decodeToken } from "../utils";

//Constructing a storage to store clients, may use the db later or something more safe

type UserId = number;
type Storage = Record<UserId, Socket.WebSocket>;
class ClientsStorage {
  storage: Storage;
  constructor() {
    this.storage = [];
  }
  removeClient = (id: number) => delete this.storage[id];
  storeClient = (id: number, ws: Socket.WebSocket) => (this.storage[id] = ws);
  getClient = (id: number) => this.storage[id];
}

const sendMessage = (
  recievers: Socket.WebSocket | Socket.WebSocket[],
  msg: SocketMessageServer
): void => {
  if (Array.isArray(recievers)) {
    recievers.forEach((reciever) => {
      reciever.send(JSON.stringify(msg));
    });
  } else {
    recievers.send(JSON.stringify(msg));
  }
};

//handle-functions for different types of messages we could recieve from client

const handleMessageChatMessage = ({
  reciever,
  senderId,
  data,
}: {
  reciever: Socket.WebSocket;
  senderId: number;
  data: ISocketClientMessageData;
}) => {
  //TODO: create message in db
  sendMessage(
    reciever,
    SOCKET_MESSAGE.CHAT_MESSAGE({
      senderId,
      userId: senderId,
      chatId: data.chatId,
      message: data.message,
    })
  );
};

const handleMessageTyping = ({
  reciever,
  senderId,
  data,
  recieverId,
}: {
  reciever: Socket.WebSocket;
  senderId: number;
  data: ISocketClientTypingData;
  recieverId: number;
}) => {
  sendMessage(
    reciever,
    SOCKET_MESSAGE.IS_TYPING({
      senderId,
      userId: senderId,
      chatId: data.chatId,
      isTyping: data.isTyping,
    })
  );
  //TODO: send notification
  //to do this we first need to get token from reciever (hence the recieverId)
  //then we need to get senders name by accessing the db
  //and then the chatId from the data
};

//handle-functions for different (events, connection, close and message)

const handleConnection = (
  userId: number,
  storage: ClientsStorage,
  ws: Socket.WebSocket
): void => {
  storage.storeClient(userId, ws);
  //set user is active in db
  //then get all users that user has chat with
  //then getClients that takes in a list of ids and returns a list of clients
  //then send message to all the clients
};

const handleClose = (userId: number, storage: ClientsStorage): void => {
  storage.removeClient(userId);
  //set user is not active in db
  //then get all users that user has chat with
  //then getClients that takes in a list of ids and returns a list of clients
  //then send message to all the clients
};

const handleMessage = (
  msg: Socket.RawData,
  userId: number,
  storage: ClientsStorage
): void => {
  try {
    const { type, data, recieverId }: SocketMessageClient = JSON.parse(
      msg.toString()
    );

    const reciever = storage.getClient(recieverId);
    if (!reciever) {
      return;
    }

    switch (type) {
      case "message":
        handleMessageChatMessage({
          reciever,
          senderId: userId,
          data: data as ISocketClientMessageData,
        });
        break;
      case "typing":
        handleMessageTyping({
          reciever,
          senderId: userId,
          data: data as ISocketClientTypingData,
          recieverId,
        });
        break;
      default:
        break;
    }
  } catch (e) {
    console.log(e);
  }
};

//all requests should have a header with token that has the senderId stored,
//and this token needs to be decoded

const verifyRequest = (req: any): number | undefined => {
  const token = req.headers[TOKEN_HEADER_KEY] as string;
  if (!token) {
    return;
  }
  const decoded = decodeToken(token);
  if (!decoded) {
    return;
  }
  return decoded.id;
};

const initSocket = (): void => {
  const socket = new Socket.Server({
    port: Number(process.env.WEBSOCKET_PORT),
  });
  const storage = new ClientsStorage();
  console.log("Socket is listening on", process.env.WEBSOCKET_PORT);

  socket.on("connection", (ws, req) => {
    const userId = verifyRequest(req);
    if (!userId) {
      return ws.close();
    }
    handleConnection(userId, storage, ws);

    ws.on("close", () => {
      handleClose(userId, storage);
    });

    ws.on("message", (msg) => {
      handleMessage(msg, userId, storage);
    });
  });
};

export { initSocket };
