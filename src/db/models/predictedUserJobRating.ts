import { Model, Sequelize } from "sequelize";
import { DataTypes } from "@sequelize/core";
import Job from "./job";
import User from "./user";

class PredictedUserJobRating extends Model {
  public value!: number;
  public userId!: number;
  public jobId!: number;
  public addUser!: (user: User) => Promise<void>;
  public addJob!: (job: Job) => Promise<void>;
  static _init(sequelize: Sequelize): void {
    PredictedUserJobRating.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        value: {
          type: DataTypes.FLOAT,
        },
      },
      {
        modelName: "userJobRating",
        timestamps: true,
        sequelize,
      }
    );
  }
  static associate() {
    PredictedUserJobRating.belongsToMany(User, { through: Job, as: "users" });
    PredictedUserJobRating.belongsToMany(Job, { through: User, as: "jobs" });
  }
}

export default PredictedUserJobRating;
