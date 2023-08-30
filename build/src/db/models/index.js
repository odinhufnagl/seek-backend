"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.models = exports.UserQuestion = exports.UserChat = exports.UserBlocking = exports.User = exports.TimeZone = exports.StoredCronJob = exports.ReadMessage = exports.RadiusArea = exports.QuestionContent = exports.Question = exports.NotificationToken = exports.Message = exports.Location = exports.Language = exports.FileType = exports.File = exports.CountryArea = exports.Country = exports.Coordinate = exports.Chat = exports.Area = exports.Answer = void 0;
const sequelize_1 = require("sequelize");
const answer_1 = __importDefault(require("./answer"));
exports.Answer = answer_1.default;
const area_1 = __importDefault(require("./area"));
exports.Area = area_1.default;
const chat_1 = __importDefault(require("./chat"));
exports.Chat = chat_1.default;
const coordinate_1 = __importDefault(require("./coordinate"));
exports.Coordinate = coordinate_1.default;
const country_1 = __importDefault(require("./country"));
exports.Country = country_1.default;
const countryArea_1 = __importDefault(require("./countryArea"));
exports.CountryArea = countryArea_1.default;
const file_1 = __importDefault(require("./file"));
exports.File = file_1.default;
const fileType_1 = __importDefault(require("./fileType"));
exports.FileType = fileType_1.default;
const language_1 = __importDefault(require("./language"));
exports.Language = language_1.default;
const location_1 = __importDefault(require("./location"));
exports.Location = location_1.default;
const message_1 = __importDefault(require("./message"));
exports.Message = message_1.default;
const notificationToken_1 = __importDefault(require("./notificationToken"));
exports.NotificationToken = notificationToken_1.default;
const question_1 = __importDefault(require("./question"));
exports.Question = question_1.default;
const questionContent_1 = __importDefault(require("./questionContent"));
exports.QuestionContent = questionContent_1.default;
const radiusArea_1 = __importDefault(require("./radiusArea"));
exports.RadiusArea = radiusArea_1.default;
const readMessage_1 = __importDefault(require("./readMessage"));
exports.ReadMessage = readMessage_1.default;
const storedCronJob_1 = __importDefault(require("./storedCronJob"));
exports.StoredCronJob = storedCronJob_1.default;
const timeZone_1 = __importDefault(require("./timeZone"));
exports.TimeZone = timeZone_1.default;
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const userBlocking_1 = __importDefault(require("./userBlocking"));
exports.UserBlocking = userBlocking_1.default;
const userChat_1 = __importDefault(require("./userChat"));
exports.UserChat = userChat_1.default;
const userQuestion_1 = __importDefault(require("./userQuestion"));
exports.UserQuestion = userQuestion_1.default;
require("dotenv").config();
/*const sequelize = new Sequelize(
  process.env.DB_LOCAL_NAME || "",
  process.env.DB_LOCAL_USERNAME || "",
  process.env.DB_LOCAL_PASSWORD,
  {
    dialect: process.env.DB_DIALECT as Dialect,
  }
);*/
console.log("pro", process.env.DB_NAME);
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || "", {
    dialect: process.env.DB_DIALECT,
    dialectOptions: process.env.NODE_ENV === "production"
        ? {
            ssl: {
                require: true,
                rejectUnauthorized: false, // Add this option if you encounter "self signed certificate" issues
            },
        }
        : {},
    logging: false,
    ssl: process.env.NODE_ENV === "production",
});
exports.sequelize = sequelize;
const models = {
    User: user_1.default,
    Coordinate: coordinate_1.default,
    Country: country_1.default,
    File: file_1.default,
    FileType: fileType_1.default,
    Location: location_1.default,
    Area: area_1.default,
    CountryArea: countryArea_1.default,
    RadiusArea: radiusArea_1.default,
    ReadMessage: readMessage_1.default,
    UserChat: userChat_1.default,
    Message: message_1.default,
    Chat: chat_1.default,
    Answer: answer_1.default,
    Question: question_1.default,
    TimeZone: timeZone_1.default,
    UserQuestion: userQuestion_1.default,
    NotificationToken: notificationToken_1.default,
    Language: language_1.default,
    QuestionContent: questionContent_1.default,
    StoredCronJob: storedCronJob_1.default,
    UserBlocking: userBlocking_1.default,
};
exports.models = models;
Object.keys(models).forEach((key, i) => {
    const val = Object.values(models)[i];
    val._init(sequelize);
});
Object.keys(models).forEach((key, i) => {
    const val = Object.values(models)[i];
    if ("associate" in val) {
        val.associate(models);
    }
});
