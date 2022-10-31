import Socket from "ws";
import { SocketMessage } from "../types";
import { getQueryParams } from "../utils";

const handleConnection = (ws: Socket.WebSocket, userId: number): void => {
  //set user is active in db and
  //send it to everyone user have a chat with
};

const handleClose = (ws: Socket.WebSocket, userId: number): void => {
  //set user is not active in db and send it to all users
  //that user have a chat with
};

const handleMessage = (ws: Socket.WebSocket, msg: Socket.RawData): void => {
  try {
    const parsedMsg: SocketMessage = JSON.parse(msg.toString());
    //send the message to the users it is concerning
    //if it is chatmessage or typing, only send it to the user who is part of the chat
  } catch (e) {
    console.log(e);
  }
};

const initSocket = (): void => {
  const socket = new Socket.Server({
    port: Number(process.env.WEBSOCKET_PORT),
  });
  console.log("Socket is listening on", process.env.WEBSOCKET_PORT);

  socket.on("connection", (ws, req) => {
    const params = getQueryParams(req.url);
    if (!params.userId) {
      return ws.close();
    }
    handleConnection(ws, params.userId);

    ws.on("close", () => {
      handleClose(ws, params.userId);
    });

    ws.on("message", (msg) => {
      handleMessage(ws, msg);
    });
  });
};

export { initSocket };
