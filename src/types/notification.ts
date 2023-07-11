import {
  DataMessagePayload,
  MessagingPayload,
  NotificationMessagePayload,
} from "firebase-admin/lib/messaging/messaging-api";
import { ServerLanguage } from "./serverLanguages";

export interface NotificationMessage extends NotificationMessagePayload {}

export interface NotificationData extends DataMessagePayload {}

export interface NotificationIsActiveData extends NotificationData {
  userId: string;
  isActive: string;
  type: NotificationType;
}

export interface NotificationMessageData extends NotificationData {
  userId: string;
  message: string;
  chatId: string;
  type: NotificationType;
}

export interface NotificationTypingData extends NotificationData {
  userId: string;
  isTyping: string;
  chatId: string;
  type: NotificationType;
}
export interface NotificationNewChatData extends NotificationData {
  chatId: string;
  type: NotificationType;
}

export interface NotificationDailyQuestionData extends NotificationData {
  type: NotificationType;
}
export interface NotificationPayload extends MessagingPayload {
  data: NotificationData;
  notification: NotificationMessage;
}

export interface NotificationIsActivePayload extends NotificationPayload {
  data: NotificationIsActiveData;
}

export interface NotificationUserMessagePayload extends NotificationPayload {
  data: NotificationMessageData;
}

export interface NotificationTypingPayload extends NotificationPayload {
  data: NotificationTypingData;
}

export interface NotificationDailyQuestionPayload extends NotificationPayload {
  data: NotificationDailyQuestionData;
}
export interface NotificationNewChatPayload extends NotificationPayload {
  data: NotificationNewChatData;
}

export type NotificationType =
  | "newChat"
  | "message"
  | "typing"
  | "isActive"
  | "dailyQuestion";

export interface Notification {
  payLoad: NotificationPayload;
  options?: NotificationOptions;
}

export interface NotificationIsActive extends Notification {
  payLoad: NotificationIsActivePayload;
}

export interface NotificationIsTyping extends Notification {
  payLoad: NotificationTypingPayload;
}
export interface NotificationDailyQuestion extends Notification {
  payLoad: NotificationDailyQuestionPayload;
}
export interface NotificationUserMessage extends Notification {
  payLoad: NotificationUserMessagePayload;
}
export interface NotificationNewChat extends Notification {
  payLoad: NotificationNewChatPayload;
}

export type DefaultNotificationNewMessageProps = {
  message: string;
  userName: string;
  userId: number;
  chatId: number;
  language: ServerLanguage;
};
export type DefaultNotificationNewChatProps = {
  chatId: number;
  questionText: string;
  userName: string;
  language: ServerLanguage;
};
export type DefaultNotificationIsTypingProps = {
  userName: string;
  userId: number;
  chatId: number;
  isTyping: boolean;
  language: ServerLanguage;
};
export type DefaultNotificationDailyQuestionProps = {
  questionText: string;
  language: ServerLanguage;
};

export type DefaultNotificationProps =
  | DefaultNotificationNewMessageProps
  | DefaultNotificationIsTypingProps
  | DefaultNotificationDailyQuestionProps
  | DefaultNotificationNewChatProps;
