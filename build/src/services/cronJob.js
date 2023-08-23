"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleJobsOnTimezones = exports.scheduleOneJob = exports.scheduleJob = void 0;
const cron_1 = require("cron");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const models_1 = require("../db/models");
const db_1 = require("./db/db");
const scheduleJob = ({ jobSchedule: { dayOfWeek, hour, minute, second, timeZone }, cronJobFunction, }) => {
    let cronJob = new cron_1.CronJob(`${second || "*"} ${minute || "*"} ${hour || "*"} * * ${dayOfWeek || "*"}`, cronJobFunction, null, true, timeZone);
    /* let cronJob: schedule.Job = schedule.scheduleJob(rule, () =>
      cronJobFunction(cronJob)
    );*/
};
exports.scheduleJob = scheduleJob;
const scheduleOneJob = ({ date, timeZone, cronJobFunction, params, type, storedJobId, }) => __awaiter(void 0, void 0, void 0, function* () {
    //TODO: now when we send the type, maybe we dont need to send the cronJobFunction and just have it mapped here...
    if (storedJobId) {
        let cronJob = new cron_1.CronJob(date, () => {
            cronJobFunction(params);
            (0, db_1.dbDelete)(models_1.StoredCronJob, { where: { id: storedJobId } });
        }, null, true, timeZone);
    }
    if (!storedJobId) {
        const storedCronJob = yield (0, db_1.dbCreate)(models_1.StoredCronJob, {
            date,
            timeZone,
            params,
            type,
        });
        let cronJob = new cron_1.CronJob(date, () => {
            cronJobFunction(params);
            (0, db_1.dbDelete)(models_1.StoredCronJob, { where: { id: storedCronJob.id } });
        }, null, true, timeZone);
    }
});
exports.scheduleOneJob = scheduleOneJob;
//TODO: this one doesnt have params right now, doesnt work
const scheduleJobsOnTimezones = (date, timeZones, cronJobFunctions) => {
    for (const timeZone of timeZones) {
        const timeZoneDate = (0, moment_timezone_1.default)().tz(timeZone).set(date.clone().toObject());
        (0, exports.scheduleOneJob)({
            date: timeZoneDate.toDate(),
            timeZone,
            cronJobFunction: cronJobFunctions[timeZone],
            params: {},
            //TODO: just to not give error
            type: "createQuestion",
        });
    }
};
exports.scheduleJobsOnTimezones = scheduleJobsOnTimezones;
