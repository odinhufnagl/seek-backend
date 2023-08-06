//TODO: the handling of timeZones right now is just as strings, not that good
import { Op } from "sequelize";
import { NotificationConstants, TIMEZONES } from "../constants";
import { Chat, Question, User, UserChat } from "../db/models";
import {
  dbFindAll,
  dbUpdate,
  scheduleJobsOnTimezones,
  sendNotificationToUsers,
  serverLanguageFromDBLanguage,
} from "../services";

//TODO: create types for the models that doesnt have all the extra stuff, just their values
//TODO: fix translations with questionText. Dont hardcode language, should be based on users language. Should not send questionText to notification, send translations
export const inviteToChat = async (userChats: UserChat[]) => {
  const userChatsUpdated = await dbUpdate(
    UserChat,
    { isInvited: true },
    {
      where: {
        [Op.or]: userChats.map((o) => ({
          chatId: o.chatId,
          userId: o.userId,
        })),
      },
    }
  );
  for (const userChat of userChats) {
    const otherUser = userChat.chat.users.find((u) => u.id !== userChat.userId);
    if (!otherUser) {
      continue;
    }
    sendNotificationToUsers([userChat.userId], (user) =>
      NotificationConstants.defaultNotifications.newChat({
        chatId: userChat.chatId,
        language: serverLanguageFromDBLanguage(user.language),
        questionText: userChat.chat.question.title,
        userName: otherUser.name,
      })
    );
  }
  //TODO: send notification to these users
};

export const inviteToQuestion = async (users: User[], question: Question) => {
  sendNotificationToUsers(
    users.map((u) => u.id),
    (user) =>
      NotificationConstants.defaultNotifications.dailyQuestion({
        language: "en",
        questionText: question.title,
      })
  );
};

export const inviteToChatByTimezone = async (
  questionId: number,
  timeZoneName: string
) => {
  console.log("inviting to chat", timeZoneName);

  const usersChatsInTimeZone = await dbFindAll(UserChat, {
    where: { isInvited: false },
    include: [
      {
        model: User,
        where: { timeZone: timeZoneName },
      },
      {
        model: Chat,
        where: { questionId },
        include: [
          { model: User, attributes: ["id", "name"] },
          { model: Question, attributes: ["id", "title"] },
        ],
      },
    ],
  });
  await inviteToChat(usersChatsInTimeZone);
};

export const inviteToQuestionByTimezone = async (
  question: Question,
  timeZoneName: string
) => {
  console.log("inviting to question", timeZoneName);
  const usersInTimeZone = await dbFindAll(User, {
    where: { timeZone: timeZoneName },
  });
  console.log("usersInTimezone", usersInTimeZone);
  await inviteToQuestion(usersInTimeZone, question);
};
export const scheduleCronJobsInviteToChat = (
  date: moment.Moment,
  questionId: number
) => {
  scheduleJobsOnTimezones(
    date,
    TIMEZONES,
    TIMEZONES.reduce((acc, tz) => {
      acc[tz] = () => inviteToChatByTimezone(questionId, tz);
      return acc;
    }, {} as any)
  );
};

export const scheduleCronJobsInviteToQuestion = (
  date: moment.Moment,
  question: Question
) => {
  scheduleJobsOnTimezones(
    date,
    TIMEZONES,
    TIMEZONES.reduce((acc, tz) => {
      acc[tz] = () => inviteToQuestionByTimezone(question, tz);
      return acc;
    }, {} as any)
  );
};
