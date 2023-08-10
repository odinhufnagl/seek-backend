import { CronCommand, CronJob } from "cron";
import moment, { Moment } from "moment-timezone";
import { JobSchedule } from "../types";

type ScheduleJobParams = {
  jobSchedule: JobSchedule;
  cronJobFunction: CronCommand;
};
export const scheduleJob = ({
  jobSchedule: { dayOfWeek, hour, minute, second, timeZone },
  cronJobFunction,
}: ScheduleJobParams) => {
  let cronJob = new CronJob(
    `${second || "*"} ${minute || "*"} ${hour || "*"} * * ${dayOfWeek || "*"}`,
    cronJobFunction,
    null,
    true,
    timeZone
  );
  /* let cronJob: schedule.Job = schedule.scheduleJob(rule, () =>
    cronJobFunction(cronJob)
  );*/
};

type ScheduleOneJobParams = {
  date: Date;
  timeZone: string;
  cronJobFunction: () => void;
};

export const scheduleOneJob = ({
  date,
  timeZone,
  cronJobFunction,
}: ScheduleOneJobParams) => {
  let cronJob = new CronJob(date, cronJobFunction, null, true, timeZone);
};

export const scheduleJobsOnTimezones = (
  date: Moment,
  timeZones: string[],
  cronJobFunctions: Record<string, () => void>
) => {
  for (const timeZone of timeZones) {
    const timeZoneDate = moment().tz(timeZone).set(date.clone().toObject());
    scheduleOneJob({
      date: timeZoneDate.toDate(),
      timeZone,
      cronJobFunction: cronJobFunctions[timeZone],
    });
  }
};
