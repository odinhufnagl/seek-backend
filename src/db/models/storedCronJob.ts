import { DataTypes } from "@sequelize/core";
import { Model, Sequelize } from "sequelize";
import { Json } from "sequelize/types/utils";
import { StoredCronJobType } from "../../types";
class StoredCronJob extends Model {
  public id!: number;
  public type!: StoredCronJobType;
  public params!: Json;
  public timeZone!: string;
  public date!: Date;

  static _init(sequelize: Sequelize): void {
    StoredCronJob.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        params: {
          type: DataTypes.JSON,
        },
        timeZone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        modelName: "storedCronJob",
        timestamps: true,
        sequelize,
      }
    );
  }
  static associate() {}
}

export default StoredCronJob;
