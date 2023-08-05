import Socket from "ws";
import { SocketMessageClientData } from "./index";

export interface SocketControllerParams {
  sender: Socket.WebSocket;
  senderId: number;
  data: SocketMessageClientData;
}
