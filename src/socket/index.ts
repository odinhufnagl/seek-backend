import Socket from "ws";
import handleSocketChatMessage from "../controllers/api/socket/handleChatMessage";
import handleSocketIsActiveEvent from "../controllers/api/socket/handleIsActiveEvent";
import handleSocketIsTypingEvent from "../controllers/api/socket/handleIsTypingEvent";
import {
  SocketMessageClient,
  SocketMessageClientIsActiveData,
  SocketMessageClientTypingData,
  SocketMessageClientUserMessageData,
  SocketMessageServer,
  WebSocket,
} from "../types";
import { decodeToken } from "../utils";

//Constructing a storage to store clients, may use the db later or something more safe

type UserId = number;
type Storage = Record<UserId, WebSocket>;
class ClientsStorage {
  storage: Storage;
  constructor() {
    this.storage = [];
  }
  removeClient = (id: number) => delete this.storage[id];
  storeClient = (id: number, ws: WebSocket) => (this.storage[id] = ws);
  getClient = (id: number) => this.storage[id];
}

class SocketServer {
  socket: Socket.Server;
  storage: ClientsStorage;
  //all requests should have a header with token that has the senderId stored,
  //and this token needs to be decoded

  broadcastMessage = (
    recievers: WebSocket | WebSocket[],
    msg: Record<string, any>
  ): void => {
    if (Array.isArray(recievers)) {
      recievers.forEach((reciever) => {
        reciever.send(JSON.stringify(msg));
      });
    } else {
      recievers.send(JSON.stringify(msg));
    }
  };

  sendMessageToUsers = (
    userIds: number | number[],
    msg: SocketMessageServer
  ): void => {
    if (Array.isArray(userIds)) {
      this.broadcastMessage(
        userIds
          .map((id) => this.storage.getClient(id))
          .filter((socket) => socket),
        msg
      );
    } else {
      if (this.storage.getClient(userIds)) {
        console.log("info", this.storage.getClient(userIds), msg);
        this.broadcastMessage(this.storage.getClient(userIds), msg);
      }
    }
  };
  //TODO: parse token more secure, this is just bad code temporary
  verifyRequest = (req: any): number | undefined => {
    const url = new URL("http://dummy" + req.url);
    const token = url.searchParams.get("auth");
    if (!token) {
      return;
    }
    const decoded = decodeToken(token as string);
    if (!decoded) {
      return;
    }
    return decoded.id;
  };
  handleConnection = (userId: number, ws: Socket.WebSocket): void => {
    this.storage.storeClient(userId, ws);
    //set user is active in db
    //then get all users that user has chat with
    //then getClients that takes in a list of ids and returns a list of clients
    //then send message to all the clients
  };

  handleClose = (userId: number): void => {
    this.storage.removeClient(userId);
    //set user is not active in db
    //then get all users that user has chat with
    //then getClients that takes in a list of ids and returns a list of clients
    //then send message to all the clients
  };

  handleMessage = (msg: Socket.RawData, userId: number): void => {
    try {
      const { type, data }: SocketMessageClient = JSON.parse(msg.toString());

      const sender = this.storage.getClient(userId);
      if (!sender) {
        return;
      }

      switch (type) {
        case "message":
          handleSocketChatMessage({
            sender,
            senderId: userId,
            data: data as SocketMessageClientUserMessageData,
          });
          break;
        case "typing":
          handleSocketIsTypingEvent({
            sender,
            senderId: userId,
            data: data as SocketMessageClientTypingData,
          });
          break;
        case "isActive":
          handleSocketIsActiveEvent({
            sender,
            senderId: userId,
            data: data as SocketMessageClientIsActiveData,
          });
        case "ping":
          return;
        default:
          break;
      }
    } catch (e) {
      console.log(e);
    }
  };

  constructor(server: any) {
    this.socket = new Socket.Server({
      verifyClient: (info: any) => this.verifyRequest(info.req),
      server,
    });
    this.storage = new ClientsStorage();
    console.log("Socket is listening on", server);

    this.socket.on("connection", (ws, req) => {
      const userId = this.verifyRequest(req);
      if (!userId) {
        ws.close();
        return;
      }
      console.log("connection opened");
      this.handleConnection(userId, ws);

      ws.on("close", () => {
        console.log("connection close");
        this.handleClose(userId);
      });

      ws.on("message", (msg: Socket.RawData) => {
        console.log(msg.toString());
        this.handleMessage(msg, userId);
      });
    });
  }
}

export { SocketServer };
