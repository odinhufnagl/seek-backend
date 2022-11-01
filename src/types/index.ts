import { SocketMessageType, SocketMessage } from "./socket";
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

export {
  IUser,
  RequestWithUser,
  IDecode,
  HttpResponseData,
  SocketMessageType,
  SocketMessage,
  INotification,
  NotificationData,
  INotificationIsActiveData,
  INotificationTypingData,
  INotificationMessageData,
  INotificationContent,
};
