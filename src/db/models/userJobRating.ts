import { Model, Sequelize } from "sequelize";
import { DataTypes } from "@sequelize/core";
import Job from "./job";
import User from "./user";

class UserJobRating extends Model {
  public value!: number;
  public userId!: number;
  public jobId!: number;
  public addUser!: (user: User) => Promise<void>;
  public addJob!: (job: Job) => Promise<void>;
  static _init(sequelize: Sequelize): void {
    UserJobRating.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.INTEGER,
        },
        jobId: {
          type: DataTypes.INTEGER,
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
  public static associate() {
    UserJobRating.belongsTo(User, { foreignKey: "userId" });
    UserJobRating.belongsTo(Job, { foreignKey: "jobId" });
  }
}

export default UserJobRating;
