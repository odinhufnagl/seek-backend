import {
  INotification,
  INotificationContent,
  NotificationData,
} from "../types";

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

const NOTIFICATION_CONTENT = {
  CHAT_MESSAGE: ({
    userName,
    message,
  }: NewMessageContentProps): INotificationContent => ({
    title: `New message from ${userName}`,
    body: message,
  }),
  IS_TYPING: ({ userName }: IsTypingContentProps): INotificationContent => ({
    title: `${userName} is typing`,
    body: "wihoo",
  }),
  DAILY_QUESTION: ({
    questionText,
  }: DailyQuestionContentProps): INotificationContent => ({
    title: "Time for your daily question",
    body: questionText,
  }),
};

type NewMessageProps = {
  token: string;
  message: string;
  userName: string;
  userId: number;
  chatId: number;
};
type IsTypingProps = {
  token: string;
  userName: string;
  userId: number;
  chatId: number;
};
type DailyQuestionProps = {
  topic: string;
  questionText: string;
};

type Props = NewMessageProps | IsTypingProps | DailyQuestionProps;

const convertValuesToStrings = (object: Props): NotificationData => {
  const json = JSON.stringify(object);
  const withStrings = JSON.parse(json, (key, val) =>
    typeof val !== "object" && val !== null ? String(val) : val
  );
  return withStrings;
};

const NOTIFICATION = {
  CHAT_MESSAGE: ({
    message,
    userName,
    userId,
    chatId,
    token,
  }: NewMessageProps): INotification => ({
    token,
    notification: NOTIFICATION_CONTENT.CHAT_MESSAGE({ userName, message }),
    data: {
      ...convertValuesToStrings({ userId, chatId, message } as NewMessageProps),
      type: "message",
    },
  }),
  IS_TYPING: ({
    userId,
    userName,
    chatId,
    token,
  }: IsTypingProps): INotification => ({
    token,
    notification: NOTIFICATION_CONTENT.IS_TYPING({ userName }),
    data: {
      ...convertValuesToStrings({
        userId,
        chatId,
      } as IsTypingProps),
      type: "typing",
      isTyping: "true",
    },
  }),
  DAILY_QUESTION: ({
    questionText,
    topic,
  }: DailyQuestionProps): INotification => ({
    notification: NOTIFICATION_CONTENT.DAILY_QUESTION({ questionText }),
    topic,
    data: { type: "dailyQuestion" },
  }),
};

export { NOTIFICATION_CONTENT, NOTIFICATION };
