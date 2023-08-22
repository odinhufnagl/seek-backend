//TODO: the handling of timeZones right now is just as strings, not that good
import moment from "moment-timezone";
import { DateConstants, FIRST_TIME_ZONE } from "../../constants";
import { Question } from "../../db/models";
import { dbCreate, dbUpdate, scheduleOneJob } from "../../services";

import { generateQuestionContent } from "../../services/question";
import { connectUsers } from "./connect";
import { inviteAllUsersToQuestion, inviteToChat } from "./invites";

const SECONDS_UNTIL_QUESTION_INVITATION = 20;
const HOURS_UNTIL_QUESTION_FINISHED = 12;
const HOURS_UNTIL_NEW_QUESTION_MIN = 1;
const HOURS_UNTIL_NEW_QUESTION_MAX = 24;

export const cronJobCreateQuestion = async () => {
  const { title, coverImageId } = await generateQuestionContent();
  console.log("question To Create", "title", title);
  //timetostart is not actually necessary right now
  const timeToStart = moment()
    .tz(FIRST_TIME_ZONE)
    .format(DateConstants.formats.DATE_WITHOUT_TIMEZONE);
  const question = await dbCreate(
    Question,
    {
      title,
      coverImageId,
      timeToStart,
    } as Question
    // { include: [{ model: File, as: DBConstants.fields.question.COVER_IMAGE }] }
  );
  /*OLD: const dateToSendQuestionInvites = moment()
    .tz(FIRST_TIME_ZONE)
    .add(SECONDS_UNTIL_QUESTION_INVITATION, "seconds");*/
  //TODO: 5 is just for testing here
  //  dateToSendQuestionInvites.add(HOURS_UNTIL_QUESTION_INVITATION, "hours");
  await inviteAllUsersToQuestion(question);
  //OLD: scheduleCronJobsInviteToQuestion(dateToSendQuestionInvites, question);

  //TODO: change the time here, this so that after all answers are in we should start creating chats, better is if we would do this in the last timezone.
  /*const dateToFinishQuestion = moment()
    .tz(FIRST_TIME_ZONE)
    .add(HOURS_UNTIL_QUESTION_FINISHED, "hours");*/
  const dateToFinishQuestion = moment().tz(FIRST_TIME_ZONE).add(1, "minute");
  scheduleOneJob({
    date: dateToFinishQuestion.toDate(),
    timeZone: FIRST_TIME_ZONE,
    cronJobFunction: () => cronJobQuestionFinished(question),
  });
};

export const cronJobQuestionFinished = async (question: Question) => {
  console.log("finishing question", question.title);
  await dbUpdate(
    Question,
    { isFinished: true },
    { where: { id: question.id } }
  );
  const newUserChats = await connectUsers(question);
  await inviteToChat(newUserChats);
  const randomHoursToStartNewQuestion =
    Math.random() *
      (HOURS_UNTIL_NEW_QUESTION_MAX - HOURS_UNTIL_NEW_QUESTION_MIN) +
    HOURS_UNTIL_NEW_QUESTION_MIN;

  const dateToStartNewQuestion = moment()
    .tz(FIRST_TIME_ZONE)
    .add(randomHoursToStartNewQuestion, "hours");
  scheduleOneJob({
    date: dateToStartNewQuestion.toDate(),
    timeZone: FIRST_TIME_ZONE,
    cronJobFunction: () => cronJobCreateQuestion(),
  });
};
