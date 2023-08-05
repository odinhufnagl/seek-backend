//TODO: the handling of timeZones right now is just as strings, not that good
import moment from "moment-timeZone";
import { DBConstants, DateConstants, FIRST_TIME_ZONE } from "../constants";
import { Answer, Chat, File, Question, User, UserChat } from "../db/models";
import {
  dbBulkCreate,
  dbCreate,
  dbFindAll,
  dbUpdate,
  generateUserPairs,
  scheduleOneJob,
} from "../services";

import { generateQuestionContent } from "../services/question";
import {
  scheduleCronJobsInviteToChat,
  scheduleCronJobsInviteToQuestion,
} from "./invites";

const SECONDS_UNTIL_QUESTION_INVITATION = 20;
const HOURS_UNTIL_QUESTION_FINISHED = 27;

export const cronJobCreateQuestion = async () => {
  const { title, coverImage } = generateQuestionContent();
  console.log("coverImage", coverImage);
  const timeToStart = moment()
    .tz(FIRST_TIME_ZONE)
    .format(DateConstants.formats.DATE_WITHOUT_TIMEZONE);
  const question = await dbCreate(
    Question,
    {
      title,
      coverImage: coverImage as File,
      timeToStart,
    } as Question,
    { include: [{ model: File, as: DBConstants.fields.question.COVER_IMAGE }] }
  );
  const dateToSendQuestionInvites = moment()
    .tz(FIRST_TIME_ZONE)
    .add(SECONDS_UNTIL_QUESTION_INVITATION, "seconds");
  //TODO: 5 is just for testing here
  //  dateToSendQuestionInvites.add(HOURS_UNTIL_QUESTION_INVITATION, "hours");

  scheduleCronJobsInviteToQuestion(dateToSendQuestionInvites, question);

  //TODO: change the time here, this so that after all answers are in we should start creating chats, better is if we would do this in the last timezone.
  const dateToFinishQuestion = moment()
    .tz(FIRST_TIME_ZONE)
    .add(HOURS_UNTIL_QUESTION_FINISHED, "hours");
  scheduleOneJob({
    date: dateToFinishQuestion.toDate(),
    timeZone: FIRST_TIME_ZONE,
    cronJobFunction: () => cronJobQuestionFinished(question),
  });
};

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

export const cronJobQuestionFinished = async (question: Question) => {
  console.log("finishing question");
  await dbUpdate(
    Question,
    { isFinished: true },
    { where: { id: question.id } }
  );
  const usersHasAnswered = await dbFindAll(User, {
    include: [{ model: Answer, where: { questionId: question.id } }],
  });
  const userPairs = generateUserPairs(usersHasAnswered);
  const timeToStart = moment()
    .tz(FIRST_TIME_ZONE)
    .format(DateConstants.formats.DATE_WITHOUT_TIMEZONE);
  const newUserChats = await setUpChatsForUserPairs(
    userPairs,
    timeToStart,
    question.id
  );
  console.log("newUserChats", newUserChats);

  //TODO: 5 is just for testing here
  //  firstTimeZoneDate.add(HOURS_UNTIL_QUESTION_INVITATION, "hours");
  const dateToSendChatInvites = moment().tz(FIRST_TIME_ZONE).add(5, "seconds");
  scheduleCronJobsInviteToChat(dateToSendChatInvites, question.id);
};
