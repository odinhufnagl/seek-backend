import moment from "moment-timezone";
import { FIRST_TIME_ZONE } from "../../constants";
import { StoredCronJob } from "../../db/models";
import { dbFindAll, scheduleOneJob } from "../../services";
import { cronJobCreateQuestion, cronJobQuestionFinished } from "./question";
//TODO: the handling of timeZones right now is just as strings, not that good
const MY_TIME_ZONE = "Europe/Stockholm";

//TODO: use transactions
//TODO: the word sequelize should not be used outside of the services. Look through ALL codes! Think interface!
//TODO: find a more general way to store cronjobs, would eliminate lots of duplicate code

const initCronJobs = async () => {
  //loop through all cronjobs in database, and start them
  //if there were no cronjob to start, start the one here

  const storedCronJobs = await dbFindAll(StoredCronJob);
  storedCronJobs.forEach(({ timeZone, date, type, params }) => {
    if (type === "createQuestion") {
      scheduleOneJob({
        timeZone,
        date,
        cronJobFunction: cronJobCreateQuestion,
        params: {},
        type: "createQuestion",
      });
    }
    if (type === "finishQuestion") {
      scheduleOneJob({
        timeZone,
        date,
        cronJobFunction: cronJobQuestionFinished,
        type: "finishQuestion",
        params,
      });
    }
  });
  const dateToStartNewQuestion = moment().tz(FIRST_TIME_ZONE).add(1, "minute");
  const existsCreateQuestionJob = storedCronJobs.find(
    (cj) => cj.type === "createQuestion"
  );
  if (!existsCreateQuestionJob) {
    scheduleOneJob({
      timeZone: FIRST_TIME_ZONE,
      date: dateToStartNewQuestion.toDate(),
      cronJobFunction: cronJobCreateQuestion,
      type: "createQuestion",
      params: {},
    });
  }

  // cronJobCreateQuestion();
};

export { initCronJobs };
