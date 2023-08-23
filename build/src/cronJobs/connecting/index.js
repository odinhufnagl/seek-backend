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
exports.initCronJobs = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const constants_1 = require("../../constants");
const models_1 = require("../../db/models");
const services_1 = require("../../services");
const question_1 = require("./question");
//TODO: the handling of timeZones right now is just as strings, not that good
const MY_TIME_ZONE = "Europe/Stockholm";
//TODO: use transactions
//TODO: the word sequelize should not be used outside of the services. Look through ALL codes! Think interface!
//TODO: find a more general way to store cronjobs, would eliminate lots of duplicate code
const initCronJobs = () => __awaiter(void 0, void 0, void 0, function* () {
    //loop through all cronjobs in database, and start them
    //if there were no cronjob to start, start the one here
    const storedCronJobs = yield (0, services_1.dbFindAll)(models_1.StoredCronJob);
    storedCronJobs.forEach(({ timeZone, date, type, params, id }) => {
        let dateToStartJob = date;
        const newDate = new Date();
        if (date < newDate) {
            dateToStartJob = (0, moment_timezone_1.default)().tz(constants_1.FIRST_TIME_ZONE).add(1, "minute").toDate();
        }
        if (type === "createQuestion") {
            //TODO: maybe not send the function, rather have the mapping in the schedule function, because all jobs will need a type anyway.
            //the only difference is, who decided which function to map to which type, is it the service function or here? Maybe it should actually be here as it is now
            (0, services_1.scheduleOneJob)({
                timeZone,
                date: dateToStartJob,
                cronJobFunction: question_1.cronJobCreateQuestion,
                params: {},
                type: "createQuestion",
                storedJobId: id,
            });
        }
        if (type === "finishQuestion") {
            (0, services_1.scheduleOneJob)({
                timeZone,
                date: dateToStartJob,
                cronJobFunction: question_1.cronJobQuestionFinished,
                type: "finishQuestion",
                params,
                storedJobId: id,
            });
        }
    });
    const dateToStartNewQuestion = (0, moment_timezone_1.default)()
        .tz(constants_1.FIRST_TIME_ZONE)
        .add(1, "minute")
        .toDate();
    const existsCreateQuestionJob = storedCronJobs.find((cj) => cj.type === "createQuestion" || cj.type === "finishQuestion");
    if (!existsCreateQuestionJob) {
        (0, services_1.scheduleOneJob)({
            timeZone: constants_1.FIRST_TIME_ZONE,
            date: dateToStartNewQuestion,
            cronJobFunction: question_1.cronJobCreateQuestion,
            type: "createQuestion",
            params: {},
        });
    }
    // cronJobCreateQuestion();
});
exports.initCronJobs = initCronJobs;
