import {
  DefaultNotificationDailyQuestionProps,
  DefaultNotificationIsTypingProps,
  DefaultNotificationNewChatProps,
  DefaultNotificationNewMessageProps,
  Notification,
  NotificationDailyQuestion,
  NotificationIsTyping,
  NotificationMessage,
  NotificationNewChat,
  NotificationUserMessage,
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
type NewChatContentProps = {
  userName: string;
  questionText: string;
};

const NotificationContent = (language: ServerLanguage) =>
  ({
    chatMessage: ({
      userName,
      message,
    }: NewMessageContentProps): NotificationMessage => ({
      title: translations({ userName })[language].notification.chatMessage
        .title,
      body: message,
    }),
    newChat: ({
      userName,
      questionText,
    }: NewChatContentProps): NotificationMessage => ({
      title: translations({ userName })[language].notification.chatMessage
        .title,
      body: questionText,
    }),
    isTyping: ({ userName }: IsTypingContentProps): NotificationMessage => ({
      title: translations({ userName })[language].notification.isTyping.title,
      body: "wihoo",
    }),
    dailyQuestion: ({
      questionText,
    }: DailyQuestionContentProps): NotificationMessage => ({
      title: translations()[language].notification.dailyQuestion.title,
      body: questionText,
    }),
  } as const);

const convertValuesToStrings = (object: Object): Object => {
  const json = JSON.stringify(object);
  const withStrings = JSON.parse(json, (key, val) =>
    typeof val !== "object" && val !== null ? String(val) : val
  );
  return withStrings;
};

class NotificationConstants {
  public static defaultNotificationsContent = NotificationContent;
  public static defaultNotifications = {
    newChat: ({
      userName,
      chatId,
      questionText,
      language,
    }: DefaultNotificationNewChatProps): NotificationNewChat => ({
      payLoad: {
        data: {
          chatId: String(chatId),
          type: "message",
        },
        notification: {
          ...this.defaultNotificationsContent(language).newChat({
            userName,
            questionText,
          }),
        },
      },
    }),
    message: ({
      message,
      userName,
      userId,
      chatId,
      language,
    }: DefaultNotificationNewMessageProps): NotificationUserMessage => ({
      payLoad: {
        data: {
          chatId: String(chatId),
          userId: String(userId),
          message,
          type: "message",
        },
        notification: {
          ...this.defaultNotificationsContent(language).chatMessage({
            userName,
            message,
          }),
        },
      },
    }),
    typing: ({
      userId,
      userName,
      chatId,
      isTyping,
      language,
    }: DefaultNotificationIsTypingProps): NotificationIsTyping => ({
      payLoad: {
        data: {
          userId: String(userId),
          chatId: String(chatId),
          isTyping: String(isTyping),
          type: "typing",
        },
        notification: {
          ...this.defaultNotificationsContent(language).isTyping({
            userName,
          }),
        },
      },
    }),
    isActive: () => ({} as Notification),
    dailyQuestion: ({
      language,
      questionText,
    }: DefaultNotificationDailyQuestionProps): NotificationDailyQuestion => ({
      payLoad: {
        data: { type: "dailyQuestion" },
        notification: {
          ...this.defaultNotificationsContent(language).dailyQuestion({
            questionText,
          }),
        },
      },
    }),
  };
}

export { NotificationConstants };
