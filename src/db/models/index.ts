import { Dialect, FindOptions, Model, Sequelize } from "sequelize";

import Answer from "./answer";
import Area from "./area";
import Chat from "./chat";
import Coordinate from "./coordinate";
import Country from "./country";
import CountryArea from "./countryArea";
import File from "./file";
import FileType from "./fileType";
import Language from "./language";
import Location from "./location";
import Message from "./message";
import NotificationToken from "./notificationToken";
import Question from "./question";
import QuestionContent from "./questionContent";
import RadiusArea from "./radiusArea";
import ReadMessage from "./readMessage";
import TimeZone from "./timeZone";
import User from "./user";
import UserChat from "./userChat";
import UserQuestion from "./userQuestion";

require("dotenv").config();

export interface IModel {
  new (): Model;
  findOne: (options?: FindOptions) => Model;
  findAll: (options?: FindOptions) => Model[];
  findByPk: (id: number, options?: FindOptions) => Model;
  create: (values: any) => Model;
  update: (
    values: Model,
    options: FindOptions
  ) => [affectedCount: number] | undefined;
}

const sequelize = new Sequelize(
  process.env.DB_NAME || "",
  process.env.DB_USERNAME || "",
  process.env.DB_PASSWORD || "",
  {
    dialect: process.env.DB_DIALECT as Dialect,
    logging: false,
  }
);

const models = {
  User,
  Coordinate,
  Country,
  File,
  FileType,
  Location,
  Area,
  CountryArea,
  RadiusArea,
  ReadMessage,
  UserChat,
  Message,
  Chat,
  Answer,
  Question,
  TimeZone,
  UserQuestion,
  NotificationToken,
  Language,
  QuestionContent,
};

Object.keys(models).forEach((key, i) => {
  const val: any = Object.values(models)[i];
  val._init(sequelize);
});

Object.keys(models).forEach((key, i) => {
  const val: any = Object.values(models)[i];
  if ("associate" in val) {
    val.associate(models);
  }
});

export {
  Answer,
  Area,
  Chat,
  Coordinate,
  Country,
  CountryArea,
  File,
  FileType,
  Language,
  Location,
  Message,
  NotificationToken,
  Question,
  QuestionContent,
  RadiusArea,
  ReadMessage,
  TimeZone,
  User,
  UserChat,
  UserQuestion,
  models,
  sequelize,
};
