export type JobSchedule = {
  dayOfWeek?: number;
  hour?: number;
  minute?: number;
  second?: number;
  timeZone?: string;
};

export type StoredCronJobType = "createQuestion" | "finishQuestion";
