import {
  DefaultNotificationProps,
  Notification,
  NotificationContent,
  NotificationData,
  NotificationType,
  DefaultNotificationIsTypingProps,
  DefaultNotificationNewMessageProps,
} from "../types";
import { ServerLanguage } from "../types/serverLanguages";
import { translations } from "./translations";

type NewMessageContentProps = {
  userName: string;
  message: string;
};

type IsTypingContentProps = {
  userName: string;
};

type DailyQuestionContentProps = {
  questionText: string;
};

const NotificationContent = (language: ServerLanguage) =>
  ({
    chatMessage: ({
      userName,
      message,
    }: NewMessageContentProps): NotificationContent => ({
      title: translations(userName)[language].notification.chatMessage.title,
      body: message,
    }),
    isTyping: ({ userName }: IsTypingContentProps): NotificationContent => ({
      title: translations(userName)[language].notification.isTyping.title,
      body: "wihoo",
    }),
    dailyQuestion: ({
      questionText,
    }: DailyQuestionContentProps): NotificationContent => ({
      title: translations()[language].notification.dailyQuestion.title,
      body: questionText,
    }),
  } as const);

const convertValuesToStrings = (
  object: DefaultNotificationProps
): NotificationData => {
  const json = JSON.stringify(object);
  const withStrings = JSON.parse(json, (key, val) =>
    typeof val !== "object" && val !== null ? String(val) : val
  );
  return withStrings;
};

class NotificationConstants {
  public static defaultNotificationsContent = NotificationContent;
  public static defaultNotifications = {
    message: ({
      message,
      userName,
      userId,
      chatId,
      token,
      language,
    }: DefaultNotificationNewMessageProps): Notification => ({
      token,
      notification: this.defaultNotificationsContent(language).chatMessage({
        userName,
        message,
      }),
      data: {
        ...convertValuesToStrings({
          userId,
          chatId,
          message,
        } as DefaultNotificationNewMessageProps),
        type: "message",
      },
    }),
    typing: ({
      userId,
      userName,
      chatId,
      token,
      language,
    }: DefaultNotificationIsTypingProps): Notification => ({
      token,
      notification: this.defaultNotificationsContent(language).isTyping({
        userName,
      }),
      data: {
        ...convertValuesToStrings({
          userId,
          chatId,
        } as DefaultNotificationIsTypingProps),
        type: "typing",
        isTyping: "true",
      },
    }),
    isActive: () => ({} as Notification),
    dailyQuestion: () => ({} as Notification),
  };
}

export { NotificationConstants };
