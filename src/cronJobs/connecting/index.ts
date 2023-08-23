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
  storedCronJobs.forEach(({ timeZone, date, type, params, id }) => {
    let dateToStartJob = date;
    const newDate = new Date();
    if (date < newDate) {
      dateToStartJob = moment().tz(FIRST_TIME_ZONE).add(1, "minute").toDate();
    }
    if (type === "createQuestion") {
      //TODO: maybe not send the function, rather have the mapping in the schedule function, because all jobs will need a type anyway.
      //the only difference is, who decided which function to map to which type, is it the service function or here? Maybe it should actually be here as it is now

      scheduleOneJob({
        timeZone,
        date: dateToStartJob,
        cronJobFunction: cronJobCreateQuestion,
        params: {},
        type: "createQuestion",
        storedJobId: id,
      });
    }
    if (type === "finishQuestion") {
      scheduleOneJob({
        timeZone,
        date: dateToStartJob,
        cronJobFunction: cronJobQuestionFinished,
        type: "finishQuestion",
        params,
        storedJobId: id,
      });
    }
  });
  const dateToStartNewQuestion = moment()
    .tz(FIRST_TIME_ZONE)
    .add(1, "minute")
    .toDate();
  const existsCreateQuestionJob = storedCronJobs.find(
    (cj) => cj.type === "createQuestion" || cj.type === "finishQuestion"
  );
  if (!existsCreateQuestionJob) {
    scheduleOneJob({
      timeZone: FIRST_TIME_ZONE,
      date: dateToStartNewQuestion,
      cronJobFunction: cronJobCreateQuestion,
      type: "createQuestion",
      params: {},
    });
  }

  // cronJobCreateQuestion();
};

export { initCronJobs };
