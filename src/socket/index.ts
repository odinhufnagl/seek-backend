import { v4 as uuidv4 } from "uuid";
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
type ClientId = string;
type Storage = Record<ClientId, { userId: UserId; ws: WebSocket }>;
class ClientsStorage {
  storage: Storage;
  constructor() {
    this.storage = {};
  }
  removeClient = (id: string) => delete this.storage[id];
  storeClient = (id: string, userId: number, ws: WebSocket) =>
    (this.storage[id] = { ws, userId });
  getClient = (id: string) => this.storage[id];

  getClientsByUserIds = (userIds: number | number[]) =>
    Array.isArray(userIds)
      ? Object.keys(this.storage).filter((clientId) =>
          userIds.includes(this.storage[clientId].userId)
        )
      : Object.keys(this.storage).filter(
          (clientId) => this.storage[clientId].userId === userIds
        );
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
    const clients = this.storage.getClientsByUserIds(userIds);
    console.log("clients", clients);
    this.broadcastMessage(
      clients
        .map((id) => this.storage.getClient(id).ws)
        .filter((socket) => socket),
      msg
    );
  };
  //TODO: parse token more secure, this is just bad code temporary, maybe not that bad but anyways
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
  handleConnection = (
    clientId: string,
    userId: number,
    ws: Socket.WebSocket
  ): void => {
    this.storage.storeClient(clientId, userId, ws);
  };

  handleClose = (clientId: string): void => {
    this.storage.removeClient(clientId);
  };

  handleMessage = (
    msg: Socket.RawData,
    clientId: string,
    userId: number
  ): void => {
    try {
      const { type, data }: SocketMessageClient = JSON.parse(msg.toString());

      const client = this.storage.getClient(clientId);
      if (!client.ws) {
        return;
      }
      const sender = client.ws;

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
      const clientId: ClientId = uuidv4();
      console.log("connection opened");
      this.handleConnection(clientId, userId, ws);

      ws.on("close", () => {
        console.log("connection close");
        this.handleClose(clientId);
      });

      ws.on("message", (msg: Socket.RawData) => {
        console.log(msg.toString());
        this.handleMessage(msg, clientId, userId);
      });
    });
  }
}

export { SocketServer };
