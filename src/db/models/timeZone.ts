import { DataTypes } from "@sequelize/core";
import { Model, Sequelize } from "sequelize";

class TimeZone extends Model {
  public name!: string;
  static _init(sequelize: Sequelize) {
    TimeZone.init(
      {
        name: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
      },
      {
        modelName: "timeZone",
        timestamps: true,
        sequelize,
      }
    );
  }
}

export default TimeZone;
