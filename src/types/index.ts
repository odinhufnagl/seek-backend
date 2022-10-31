import { SocketMessageType, SocketMessage } from "./socket";
import { Request } from "express";
import { IUser } from "./models";

interface IDecode {
  id: number;
}

interface RequestWithUser extends Request {
  user?: IDecode;
}

type HttpResponseData = {
  body: object;
  status?: number;
};

export { IUser, RequestWithUser, IDecode, HttpResponseData,  SocketMessageType, SocketMessage };

