import { ServerLanguage } from "./serverLanguages";

export interface NotificationIsActiveData {
  userId: string;
  isActive: string;
  type: NotificationType;
}

export interface NotificationMessageData {
  userId: string;
  message: string;
  chatId: string;
  type: NotificationType;
}

export interface NotificationTypingData {
  userId: string;
  isTyping: string;
  chatId: string;
  type: NotificationType;
}

export interface NotificationDailyQuestionData {
  type: NotificationType;
}

export interface NotificationContent {
  title: string;
  body: string;
}

export type NotificationType =
  | "message"
  | "typing"
  | "isActive"
  | "dailyQuestion";

export type NotificationData =
  | NotificationIsActiveData
  | NotificationMessageData
  | NotificationTypingData
  | NotificationDailyQuestionData;

export interface Notification {
  token?: string;
  topic?: string;
  notification: NotificationContent;
  data?: NotificationData;
}

export type DefaultNotificationNewMessageProps = {
  token: string;
  message: string;
  userName: string;
  userId: number;
  chatId: number;
  language: ServerLanguage;
};
export type DefaultNotificationIsTypingProps = {
  token: string;
  userName: string;
  userId: number;
  chatId: number;
  language: ServerLanguage;
};

export type DefaultNotificationProps =
  | DefaultNotificationNewMessageProps
  | DefaultNotificationIsTypingProps;
