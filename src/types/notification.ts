export interface INotificationIsActiveData {
  userId: string;
  isActive: string;
  type: NotificationDataType;
}

export interface INotificationMessageData {
  userId: string;
  message: string;
  chatId: string;
  type: NotificationDataType;
}

export interface INotificationTypingData {
  userId: string;
  isTyping: string;
  chatId: string;
  type: NotificationDataType;
}

export interface INotificationDailyQuestionData {
  type: NotificationDataType;
}

export interface INotificationContent {
  title: string;
  body: string;
}

export type NotificationDataType =
  | "message"
  | "typing"
  | "isActive"
  | "dailyQuestion";

export type NotificationData =
  | INotificationIsActiveData
  | INotificationMessageData
  | INotificationTypingData
  | INotificationDailyQuestionData;

export interface INotification {
  token?: string;
  topic?: string;
  notification: INotificationContent;
  data?: NotificationData;
}
