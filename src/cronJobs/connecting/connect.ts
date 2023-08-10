import moment from "moment-timezone";
import { DateConstants, FIRST_TIME_ZONE } from "../../constants";
import {
  Answer,
  Chat,
  Message,
  Question,
  User,
  UserChat,
} from "../../db/models";
import { dbBulkCreate, dbFindAll, generateUserPairs } from "../../services";

const userChatsFromUserPairs = (
  chats: Chat[],
  userPairs: (User | undefined)[][]
) => {
  let userChats: UserChat[] = [];
  chats.forEach((chat, i) => {
    userChats.push({
      chatId: chat.id,
      userId: userPairs[i][0]?.id,
    } as UserChat);
    userChats.push({
      chatId: chat.id,
      userId: userPairs[i][1]?.id,
    } as UserChat);
  });
  return userChats;
};

const setUpChatsForUserPairs = async (
  userPairs: (User | undefined)[][],
  time: string,
  questionId: number
): Promise<UserChat[]> => {
  const chats = await dbBulkCreate(
    Chat,
    userPairs.map(() => ({ questionId: questionId, timeToStart: time }))
  );

  const userChats = await dbBulkCreate(
    UserChat,
    userChatsFromUserPairs(chats, userPairs)
  );
  return userChats;
};

const createMessagesFromAnswers = async (
  answers: Answer[],
  userChats: UserChat[]
): Promise<Message[]> => {
  const messages = await dbBulkCreate(
    Message,
    userChats
      .filter((uc) => answers.find((a) => a.userId == uc.userId))
      .map((uc) => {
        return {
          userId: uc.userId,
          chatId: uc.chatId,
          text: answers.find((a) => a.userId == uc.userId)?.text,
        };
      })
  );
  return messages;
};

export const connectUsers = async (question: Question): Promise<UserChat[]> => {
  const usersWithAnswer = await dbFindAll(User, {
    include: [{ model: Answer, where: { questionId: question.id } }],
  });
  const userPairs = generateUserPairs(usersWithAnswer);

  //this with timeToStart is not necessary at the moment, but doesnt hurt
  const timeToStart = moment()
    .tz(FIRST_TIME_ZONE)
    .format(DateConstants.formats.DATE_WITHOUT_TIMEZONE);
  const newUserChats = await setUpChatsForUserPairs(
    userPairs,
    timeToStart,
    question.id
  );

  await createMessagesFromAnswers(
    usersWithAnswer.map((u) => u.answers[0]),
    newUserChats
  );

  console.log("newUserChats", newUserChats);

  //TODO: 5 is just for testing here
  //  firstTimeZoneDate.add(HOURS_UNTIL_QUESTION_INVITATION, "hours");
  //OLD: const dateToSendChatInvites = moment().tz(FIRST_TIME_ZONE).add(5, "seconds");
  //OLD: scheduleCronJobsInviteToChat(dateToSendChatInvites, question.id);
  return newUserChats;
};
