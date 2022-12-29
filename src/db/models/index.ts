import { Dialect, Sequelize } from "sequelize";
import user from "./user";

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
  User: user(sequelize),
};

Object.keys(models).forEach((key, i) => {
  const val: any = Object.values(models)[i];
  if ("associate" in val) {
    val.associate(models);
  }
});

export { sequelize, models };
