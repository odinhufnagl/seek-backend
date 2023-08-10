import moment from "moment-timezone";
import { FIRST_TIME_ZONE } from "../../constants";
import { scheduleOneJob } from "../../services";
import { cronJobCreateQuestion } from "./question";
//TODO: the handling of timeZones right now is just as strings, not that good
const MY_TIME_ZONE = "Europe/Stockholm";

//TODO: use transactions
//TODO: the word sequelize should not be used outside of the services. Look through ALL codes! Think interface!
//TODO: find a more general way to store cronjobs, would eliminate lots of duplicate code

const initCronJobs = () => {
  /*const questionJobSchedule: JobSchedule = {
    hour: 14,
    minute: 47,
    second: 0,
    timeZone: MY_TIME_ZONE,
  };*/
  const dateToStartNewQuestion = moment().tz(FIRST_TIME_ZONE).add(1, "minute");

  scheduleOneJob({
    timeZone: FIRST_TIME_ZONE,
    date: dateToStartNewQuestion.toDate(),
    cronJobFunction: () => cronJobCreateQuestion(),
  });

  // cronJobCreateQuestion();
};

export { initCronJobs };
