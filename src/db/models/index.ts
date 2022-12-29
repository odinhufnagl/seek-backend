import { Dialect, Sequelize } from "sequelize";
import Company from "./company";
import EmploymentType from "./employmentType";
import Job from "./job";
import PredictedUserJobRating from "./predictedUserJobRating";
import Tag from "./tag";
import User from "./user";
import UserJobRating from "./userJobRating";
import WordVector from "./wordVector";

require("dotenv").config();

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
  WordVector,
  Company,
  Job,
  User,
  Tag,
  EmploymentType,
  UserJobRating,
  PredictedUserJobRating,
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
  sequelize,
  models,
  WordVector,
  Company,
  Job,
  User,
  Tag,
  EmploymentType,
  PredictedUserJobRating,
  UserJobRating,
};
