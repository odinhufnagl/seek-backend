import { CronCommand, CronJob } from "cron";
import moment, { Moment } from "moment-timezone";
import { StoredCronJob } from "../db/models";
import { JobSchedule, StoredCronJobType } from "../types";
import { dbCreate, dbDelete } from "./db/db";

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
  cronJobFunction: (params: any) => void;
  params: any;
  type: StoredCronJobType;
  storedJobId?: number;
};

export const scheduleOneJob = async ({
  date,
  timeZone,
  cronJobFunction,
  params,
  type,
  storedJobId,
}: ScheduleOneJobParams) => {
  //TODO: now when we send the type, maybe we dont need to send the cronJobFunction and just have it mapped here...
  if (storedJobId) {
    let cronJob = new CronJob(
      date,
      () => {
        cronJobFunction(params);
        dbDelete(StoredCronJob, { where: { id: storedJobId } });
      },
      null,
      true,
      timeZone
    );
  }
  if (!storedJobId) {
    const storedCronJob = await dbCreate(StoredCronJob, {
      date,
      timeZone,
      params,
      type,
    } as StoredCronJob);
    let cronJob = new CronJob(
      date,
      () => {
        cronJobFunction(params);
        dbDelete(StoredCronJob, { where: { id: storedCronJob.id } });
      },
      null,
      true,
      timeZone
    );
  }
};

//TODO: this one doesnt have params right now, doesnt work
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
      params: {},
      //TODO: just to not give error
      type: "createQuestion",
    });
  }
};
