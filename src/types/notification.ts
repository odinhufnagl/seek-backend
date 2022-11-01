interface INotificationIsActiveData {
  userId: string;
  isActive: string;
  type: NotificationDataType;
}

interface INotificationMessageData {
  userId: string;
  message: string;
  chatId: string;
  type: NotificationDataType;
}

interface INotificationTypingData {
  userId: string;
  isTyping: string;
  chatId: string;
  type: NotificationDataType;
}

interface INotificationDailyQuestionData {
  type: NotificationDataType;
}

interface INotificationContent {
  title: string;
  body: string;
}

type NotificationDataType = "message" | "typing" | "isActive" | "dailyQuestion";

type NotificationData =
  | INotificationIsActiveData
  | INotificationMessageData
  | INotificationTypingData
  | INotificationDailyQuestionData;

interface INotification {
  token?: string;
  topic?: string;
  notification: INotificationContent;
  data?: NotificationData;
}

export {
  INotification,
  NotificationData,
  INotificationIsActiveData,
  INotificationTypingData,
  INotificationMessageData,
  INotificationDailyQuestionData,
  INotificationContent,
};
