import {
  SocketMessageType,
  SocketMessageServer,
  SocketMessageClient,
  ISocketServerIsActiveData,
  ISocketServerTypingData,
  ISocketServerMessageData,
  ISocketClientMessageData,
  ISocketClientTypingData,
  ISocketClientIsActiveData,
} from "./socket";
import { Request } from "express";
import { IUser } from "./models";
import {
  INotification,
  NotificationData,
  INotificationIsActiveData,
  INotificationMessageData,
  INotificationTypingData,
  INotificationContent,
} from "./notification";

import { EmailData } from "./email";

type Decoded = {
  id: number;
};

interface RequestWithUser extends Request {
  user?: Decoded;
}

type HttpResponseData = {
  body: object;
  status?: number;
};

export {
  IUser,
  RequestWithUser,
  HttpResponseData,
  SocketMessageType,
  INotification,
  NotificationData,
  INotificationIsActiveData,
  INotificationTypingData,
  INotificationMessageData,
  INotificationContent,
  Decoded,
  SocketMessageClient,
  SocketMessageServer,
  ISocketServerIsActiveData,
  ISocketServerTypingData,
  ISocketServerMessageData,
  ISocketClientMessageData,
  ISocketClientTypingData,
  ISocketClientIsActiveData,
  EmailData,
};
